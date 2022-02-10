import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoticeBoard } from '../Models/NoticeBoard';

@Injectable({
  providedIn: 'root'
})
export class NoticeBoardService {

  private saveNoticeUrl: string = "http://127.0.0.1:8000/api/save/notice/user/";
  private saveCommunityUserUrl: string = "http://127.0.0.1:8000/api/add/user/community";
  private fetchDeptNameUrl: string = "http://127.0.0.1:8000/api/auth/login";
  private fetchNoticeUrl: string = "http://127.0.0.1:8000/api/fetch/notice/user/";

  constructor(private _http: HttpClient) { }
  

  saveNotice(formData: FormData, userId:Number) {

    return this._http.post(this.saveNoticeUrl+userId, formData,{
      responseType: 'text' as 'json'
    });
  }

  fetchNotice(userId:Number): Observable<NoticeBoard[]> {

    return this._http.get<NoticeBoard[]>(this.fetchNoticeUrl+userId);
    //return this._http.get<NoticeBoard[]>("/assets/data/department.json");

  }

}
