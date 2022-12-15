import { Component, OnInit } from '@angular/core';
import { ClassifiedService } from 'app/classifieds/services/classified.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.css']
})
export class CreateNotificationComponent implements OnInit {

  constructor(private classifiedService: ClassifiedService) { 

  }

  ngOnInit(): void {
    this.classifiedService.getNotifications().subscribe((response) => {
      console.log(response);
    });
  }


}
