import { Component, OnInit } from '@angular/core';
import { ClassifiedService } from 'app/classifieds/services/classified.service';

@Component({
  selector: 'app-notifications-listing',
  templateUrl: './notifications-listing.component.html',
  styleUrls: ['./notifications-listing.component.css']
})
export class NotificationsListingComponent implements OnInit {

  constructor(private classifiedService: ClassifiedService) { }


  classifieds: any = [];
  ngOnInit(): void {

    this.classifiedService.getNotifications().subscribe((response) => {
      console.log(response);
      this.classifieds = response.data.user.notifications;
      
    });

    this.classifiedService.getNotifications().subscribe((response) => {

    });
  }

  markAsRead(notification:any):void{
    this.classifieds.forEach((element:any) => {
      if(element.id == notification.id){
        element.seen = true;
      }
    });
    this.classifiedService.updateNotification(notification.id).subscribe((response) => {
      console.log(response);
    });
  }


}
