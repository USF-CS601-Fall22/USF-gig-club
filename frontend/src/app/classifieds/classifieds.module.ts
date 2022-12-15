import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifiedListingComponent } from './pages/classified-listing/classified-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { CreateClassifiedComponent } from './pages/create-classified/create-classified.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateNotificationComponent } from './pages/create-notification/create-notification.component';
import { NotificationsListingComponent } from './pages/notifications-listing/notifications-listing.component';
import { EventListingComponent } from './pages/event-listing/event-listing.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { AdminComponent } from './pages/admin/admin.component';
import {io, Socket} from  'socket.io-client' ;

import { MaterialModule } from 'app/material.module';

const routes: Routes = [
  { path: 'create', component: CreateClassifiedComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsListingComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventListingComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '', component: ClassifiedListingComponent, canActivate: [AuthGuard] }
];


@NgModule({
  declarations: [
    AdminComponent,
    ClassifiedListingComponent,
    CreateClassifiedComponent,
    CreateNotificationComponent,
    NotificationsListingComponent,
    EventListingComponent,
    CreateEventComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ClassifiedsModule { }
