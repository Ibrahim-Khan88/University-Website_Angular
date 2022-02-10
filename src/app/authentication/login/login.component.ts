import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/Models/Login';
import { LoginResponse } from 'src/app/Models/LoginResponse';
import { User } from 'src/app/Models/User';
import { CommunityService } from 'src/app/Services/community.service';
import { AuthenticationService } from '../Service/authentication.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  private login: Login = { email: "", password: "" };
  private loginResponse: LoginResponse = new LoginResponse();
  public formdata = new FormData();
  private temp: string = "";
  deptName: String[] = [];
  private check: boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private _storageService: LocalStorageService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private communityService: CommunityService) {

    this.loginForm = formBuilder.group({
      'gmail': [null, Validators.required],
      'password': [null, Validators.required]
    });

  }

  ngOnInit(): void {

    this.loginForm.patchValue({
      gmail : "dummydata@gmail.com",
      password : "11"
    });


    $('#button').click(function() {
      alert("‘GeeksForGeeks’");
  });
  }

  loginFormSubmit() {

    // this.router.navigate(["/department-admin/page"]);


    if (this.loginForm.valid) {

      this.loadingOpen();

      this.login.email = this.loginForm.get("gmail")?.value;
      this.login.password = this.loginForm.get("password")?.value;
      

      this.authenticationService.login(this.login).subscribe(
        data => {

          this.loadingClose();

          this.loginResponse = JSON.parse(data.toString());
          this._storageService.set("user", this.loginResponse.user);
          this._storageService.set("accessCommunity", this.loginResponse.accessCommunity);
          this._storageService.set("jwt", this.loginResponse.jwt);

         // console.log("jwt--->" + this.loginResponse.user.id);


          // For Super Admin
          if (this.loginResponse.accessCommunity.indexOf("SuperAdmin") !== -1) {
            //alert("SuperAdmin");
            this.router.navigate(["/admin/page"]);
          }
          else {

            // For Department Admin and other
            this.communityService.fetchDeptName().subscribe(
              data => {

                // For Department Admin
                this.deptName = data;
                this.check = false;
                this.loginResponse.accessCommunity.forEach((value) => {

                  if (this.deptName.indexOf(value) !== -1) {
                    this.check = true;
                    this.router.navigate(["/department-admin/page"]);
                  }

                });

                //For At least one access user
                if(!this.check){
                  if (this.loginResponse.accessCommunity.length > 0){
                    this.router.navigate(["/user/access-user"]);
                  }
                  else{
                    this.router.navigate(["/user/user"]);
                  }
                }
            

              },
              error => {
                this.toastr.error("An error has occured", "Error");
              }
            );

          }

          //this.router.navigate(["/auth/user"]);
        },
        error => {
          this.loadingClose();
          this.toastr.error("Credentials is not correct", "Authentication error");
        }
      );


    }
    else {

      let key = Object.keys(this.loginForm.controls);

      key.filter(data => {
        let control = this.loginForm.controls[data];

        if (control.errors != null) {
          control.markAllAsTouched();
        }
      });
      //alert("Fill the form properly");
    }

  }



  signUpRoute() {
    this.router.navigate(["/auth/registrationtype"]);
  }


  loadingOpen() {

    $("#lodingDiv").css({ 'height': 100 });
    $('#lodingDiv').css({ top: window.pageYOffset + 180 });
    $("#backgroundloding").css({ 'height': "100vh" });

  }

  loadingClose() {

    $("#lodingDiv").css({ 'height': 0 });
    $("#backgroundloding").css({ 'height': "0" });

  }
  //npm i --save-dev @types/jquery

}
