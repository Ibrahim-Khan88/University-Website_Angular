import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersRegistrationRequest } from 'src/app/Models/UsersRegistrationRequest';
import { LoginResponse } from 'src/app/Models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



 
  constructor(private _http: HttpClient) { }

  private deptFetchUrl: string = "http://127.0.0.1:8000/api/fetch/dept";
  private loginUrl: string = "http://127.0.0.1:8000/api/auth/login";
  private acceptAndAssignUserCommunityRoleUrl: string = "http://127.0.0.1:8000/api/user/registration-request/assign";
  private fetchUserRegistrationRequestUrl: string = "http://127.0.0.1:8000/api/fetch/user/registration-request/";
  private roomFetchUrl: string = "http://127.0.0.1:8000/api/fetch/room";
  private saveRegistrationUrl: string = "http://127.0.0.1:8000/api/user/registration-request";
  private adminSaveRequestUrl: string = "http://localhost:8080/investigationrequestadmin/";
  private registrationRequestResponseUrl: string = "http://127.0.0.1:8000/api/user/registration-request/response";
  

  login(loginData: any): Observable<LoginResponse> {

    return this._http.post<LoginResponse>(this.loginUrl, loginData, {
      responseType: 'text' as 'json'
    });

  }

  saveRegistration(formdata: FormData): Observable<any> {
    
    return this._http.post(this.saveRegistrationUrl, formdata, {
      responseType: 'text' as 'json'
    });

  }

  acceptAndAssignUserCommunityRole(formdata: FormData):Observable<any> {

    return this._http.post(this.acceptAndAssignUserCommunityRoleUrl, formdata, {
      responseType: 'text' as 'json'
    });
    
  }

  registrationRequestResponse(formdata: FormData):Observable<any> {

    return this._http.post(this.registrationRequestResponseUrl, formdata, {
      responseType: 'text' as 'json'
    });
    
  }


  fetchUserRegistrationRequest(userId:Number): Observable<UsersRegistrationRequest[]> {

    return this._http.get<UsersRegistrationRequest[]>(this.fetchUserRegistrationRequestUrl+userId);
    //return this._http.get<string[]>("/assets/data/department.json");

  }


  fetchDepartment(): Observable<string[]> {

    //return this._http.get<string[]>(this.deptFetchUrl);
    return this._http.get<string[]>("/assets/data/department.json");

  } 

  fetchDesignation(): Observable<string[]> {

    return this._http.get<string[]>("/assets/data/designation.json");

  }

  fetchRoom(): Observable<string[]> {

    //return this._http.get<string[]>(this.roomFetchUrl);
    return this._http.get<string[]>("/assets/data/room.json");

  }

}
