import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  userDetails: any = {};
  token: String = "";
  isUser: boolean = true;
  isAdmin: boolean = false;

  private BASE_URL = environment.api_base_url;

  constructor(private http: HttpClient) { }

  setDetails(user:any){

    this.userDetails = user;
    
    if(user.isAdmin){
      this.setAdmin();
    }else{
      this.setUser();
    }
  }

  setUser(){
    this.isAdmin = false;
    this.isUser = true;
    localStorage.setItem("user", "true");
    localStorage.setItem("admin", "false");

  }

  setAdmin(){
    this.isAdmin = true;
    this.isUser = false;
    localStorage.setItem("user", "false");
    localStorage.setItem("admin", "true");
  }

  getUser(){
    return this.userDetails;
  } 

}
