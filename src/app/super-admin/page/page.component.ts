import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication/Service/authentication.service';
import { UsersRegistrationRequest } from 'src/app/Models/UsersRegistrationRequest';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  userRegistrationRequest: UsersRegistrationRequest[] = [];
  
  private i:number = 0;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private _storageService: LocalStorageService) {

     }

  ngOnInit(): void {
    this.fetchUserRegistrationRequest();
  }

  fetchUserRegistrationRequest(){

    this.authenticationService.fetchUserRegistrationRequest().subscribe(
      data => {

        this.userRegistrationRequest = data;
        for (this.i = 0; this.i < this.userRegistrationRequest.length; this.i++) {
          console.log(this.userRegistrationRequest[this.i].name);
        }
        
        //this.toastr.success('We will notify you within 24 hours', "Request Accepted");
        
      },
      error => {
        this.toastr.error("An error has occured", "Error");
      }
    );

  }

  detailUserPage(id:Number, names: string){
    this._storageService.set("userId", id);
    this._storageService.set("communityNames", names);
    console.log(this._storageService.get("UserId") + " " + this._storageService.get("communityNames"));
    this.router.navigate(["/admin/userdetail"]);
  }

}
