import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassifiedCreationRequest } from 'app/interfaces/classifiedcreationrequest.interface';
import { ClassifiedRequest } from 'app/interfaces/classifiedrequest.interface';
import { IResponse } from 'app/interfaces/response.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassifiedService {

  private BASE_URL = environment.api_base_url;

  constructor(private http: HttpClient) { }

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
}
