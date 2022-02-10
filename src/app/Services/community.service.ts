import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {


  private saveCommunityUserUrl: string = "http://127.0.0.1:8000/api/add/user/community";
  private fetchDeptNameUrl: string = "http://127.0.0.1:8000/api/fetch/dept";
  private fetchCommunityMemberUrl: string = "http://127.0.0.1:8000/api/fetch/user/community/";
  private deleteMemberUrl: string = "http://127.0.0.1:8000/api/delete/user/";
  private fetchAllUserUrl: string = "http://127.0.0.1:8000/api/fetch/user";
  private communityNameUrl: string = "http://127.0.0.1:8000/api/fetch/community";
  

  constructor(private _http: HttpClient) { }


  fetchCommunityMemberByCommunityName(communityName: String) : Observable<User[]> {

    return this._http.get<User[]>(this.fetchCommunityMemberUrl + communityName);

  }

  fetchAllUser() : Observable<User[]> {

    return this._http.get<User[]>(this.fetchAllUserUrl); 
    //return this._http.get<User[]>("/assets/data/userWithoutDetails.json");

  }


  deleteMember(communityName: String, userId:Number, removeUserId: Number) {

    return this._http.delete(this.deleteMemberUrl + userId + "/community/" + communityName 
    + "/memberId/" + removeUserId);

  }



  fetchCommunityName(): Observable<String[]> {

    return this._http.get<String[]>(this.communityNameUrl);
   // return this._http.get<string[]>("/assets/data/community.json");

  }

  fetchDeptName(): Observable<String[]> {

    return this._http.get<String[]>(this.fetchDeptNameUrl);
   // return this._http.get<string[]>("/assets/data/department.json");

  }


  saveCommunityUser(formdata: FormData): Observable<any> {
    
    return this._http.post(this.saveCommunityUserUrl, formdata, {
      responseType: 'text' as 'json'
    });

  }

}
