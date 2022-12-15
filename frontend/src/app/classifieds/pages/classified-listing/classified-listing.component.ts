import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassifiedRequest } from 'app/interfaces/classifiedrequest.interface';
import { FetchClassifieds } from 'app/store/actions/classified.actions';
import { AppState } from 'app/store/app.state';
import { ClassifiedService } from 'app/classifieds/services/classified.service';
import { classifiedsSelector } from 'app/store/selectors/classified.selectors';
import { Observable } from 'rxjs';
import { CommonService } from 'app/common.service';

@Component({
  selector: 'app-classified-listing',
  templateUrl: './classified-listing.component.html',
  styleUrls: ['./classified-listing.component.css']
})
export class ClassifiedListingComponent implements OnInit {

  classifieds$: Observable<any[]>;

  notification_count:number = 0;
  menu: any;

  constructor(private store: Store<AppState>, private classifiedService: ClassifiedService,
    private commonService: CommonService) {
    this.classifieds$ = this.store.select(classifiedsSelector);
  }

  ngOnInit(): void {
    const request: ClassifiedRequest = {
      page: 1,
      size: 10
    };
    this.store.dispatch(FetchClassifieds({ request }));
    this.classifiedService.fetchClassifieds(request).subscribe((response) => {
        console.log(response);
      });
    this.classifiedService.getNotifications().subscribe((response) => {

      let notification_count = 0;

      response.data.user.notifications.forEach((notification: { seen: boolean; })=> {
        if(notification.seen == false){
          notification_count++;
        }
      });

      this.notification_count = notification_count;
    });


    this.classifiedService.listenFromAdmin().subscribe((response) => {
        this.messages.push(response);
    });


  }

  reportOption(id:any){
    let ans = prompt("Please enter the reason for reporting this post");
    if(ans){
      this.reportNow(id);
    }
  }

  reportNow(id:any){
    this.classifiedService.updateClassified({id, accepting: false}).subscribe((response) => {
      console.log(response);
    });

    alert("Post reported successfully");
  }












  showChatBox: boolean = false;
  messages: any = [{ name: "bot" , text: "Need help or quick assistance, type here." }];

  toggleChatBox(){
    this.showChatBox = !this.showChatBox;
  }


  askAdmin(message:any){
   let data = { name: this.commonService.getUser().firstName , text: message }
      this.messages.push({ name: this.commonService.getUser().firstName, text: message });
    this.classifiedService.askAdmin({data})
    this.message = "";

  }

  message:String = "";



}

