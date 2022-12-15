import { Component, OnInit } from '@angular/core';
import { ClassifiedService } from 'app/classifieds/services/classified.service';
import { CommonService } from 'app/common.service';
import { ClassifiedRequest } from 'app/interfaces/classifiedrequest.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {io, Socket} from  'socket.io-client' ;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private commonService: CommonService,
    private classifiedService: ClassifiedService,) { }
     name = '';
  private BASE_URL = environment.api_base_url;


  classifieds: any = [];


  ngOnInit(): void {

    const request: ClassifiedRequest = {
      page: 1,
      size: 10
    };

    this.name = this.commonService.getUser().firstName;

    this.classifiedService.fetchClassifieds(request).subscribe((response) => {
      this.classifieds = response.data.classifieds;
    });

  }








  allowClassified(classifiedId: number) {
    this.classifiedService.allowClassified(classifiedId).subscribe((response) => {
      // set classifed.accepting to true
      this.classifieds = this.classifieds.map((classified: any) => {
        if (classified.id === classifiedId) {
          classified.accepting = true;
        }
        return classified;
      }
      );
    });
  }

  deleteClassified(classifiedId: number) {
    this.classifiedService.deleteClassified(classifiedId).subscribe((response) => {
      // remove the classified from the list
      this.classifieds = this.classifieds.filter((classified: any) => classified.id !== classifiedId);
    });
  }




  text:String = '';
  announce(){

    this.classifiedService.announce(this.text).subscribe((response:any) => {
      console.log(response);
      alert("Your announcement is sent to all users");
    });



  }




}
