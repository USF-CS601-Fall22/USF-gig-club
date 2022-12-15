import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassifiedCreationRequest } from 'app/interfaces/classifiedcreationrequest.interface';
import { ClassifiedRequest } from 'app/interfaces/classifiedrequest.interface';
import { IResponse } from 'app/interfaces/response.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import {io, Socket} from  'socket.io-client' ;

@Injectable({
  providedIn: 'root',
})
export class ClassifiedService {

  private BASE_URL = environment.api_base_url;

  private socket:any;


  constructor(private http: HttpClient) { 
    if(!environment.production){
      this.socket = io(this.BASE_URL, {
      withCredentials: false,
    });
  }
  }


  announce(message:any){
    const url = `${this.BASE_URL}/notification/create`;
    return this.http.post<IResponse>(url, {text: message, to: "*"});

  }

  askAdmin(data:any){    
    this.socket.emit('needhelp', data);
  }


  listenFromAdmin(){
    return new Observable((observer) => {
      this.socket.on('needhelp', (res:any) => {
        observer.next(res);
      });
    });
  }


















  /////////////////////////////


  fetchClassifieds(request: ClassifiedRequest): Observable<IResponse> {
    const url = `${this.BASE_URL}/classifieds`;
    console.log(url);
    let params = new HttpParams();
    for (const [key, value] of Object.entries(request)) {
      params = params.append(key, value);
    }
    console.log(request);
    return this.http.get<IResponse>(url, { params });
  }

  createClassified(request: ClassifiedCreationRequest): Observable<IResponse> {
    const url = `${this.BASE_URL}/classifieds`;
    return this.http.post<IResponse>(url, request);
  }
  updateClassified(payload:any): Observable<IResponse> {
    const url = `${this.BASE_URL}/classifieds/${payload.id}`;
    return this.http.put<IResponse>(url, payload);
  }

  allowClassified(classifiedId: number): Observable<IResponse> {
    const url = `${this.BASE_URL}/classifieds/${classifiedId}`;
    return this.http.put<IResponse>(url, {accepting: true});
  }

  deleteClassified(classifiedId: number): Observable<IResponse> {
    const url = `${this.BASE_URL}/classifieds/${classifiedId}`;
    return this.http.delete<IResponse>(url);
  }


  getNotifications(): Observable<IResponse> {
    const url = `${this.BASE_URL}/notification/`;
    return this.http.get<IResponse>(url);
  }

  updateNotification(notififcation_id:any): Observable<IResponse> {
    const url = `${this.BASE_URL}/notification/update`;
    return this.http.patch<IResponse>(url, {seen: true, id: notififcation_id});
  }
}
