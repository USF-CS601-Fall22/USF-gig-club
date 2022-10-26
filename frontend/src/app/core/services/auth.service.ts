import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from 'app/interfaces/loginrequest.interface';
import { IResponse } from 'app/interfaces/response.interface';
import { SignupRequest } from 'app/interfaces/signuprequest.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.api_base_url;

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<IResponse> {
    const url = `${this.BASE_URL}/users/login`;
    return this.http.post<IResponse>(url, request);
  }

  signup(request: SignupRequest): Observable<IResponse> {
    const url = `${this.BASE_URL}/users/signup`;
    return this.http.post<IResponse>(url, request);
  }
}
