import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/Models/Login';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  private login: Login = {email:"", password:""};
  public formdata = new FormData();

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private _storageService: LocalStorageService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService) { 

    this.loginForm = formBuilder.group({
      'gmail': [null, Validators.required],
      'password': [null, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  loginFormSubmit() {


    if (this.loginForm.valid) {

      this.login.email = this.loginForm.get("gmail")?.value;
      this.login.password = this.loginForm.get("password")?.value;

      //console.log(this.login);
      

      this.authenticationService.login(this.login).subscribe( 
        data => {
        console.log("jwt--->" + data);
        
        this.router.navigate(["/auth/user"]);
        },
        error => {
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

  signUpRoute(){
    this.router.navigate(["/auth/registration"]);
  }

}
