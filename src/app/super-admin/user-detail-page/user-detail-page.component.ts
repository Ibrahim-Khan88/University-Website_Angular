import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication/Service/authentication.service';
import { UsersRegistrationRequest } from 'src/app/Models/UsersRegistrationRequest';
import { LocalStorageService } from 'ngx-localstorage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css']
})
export class UserDetailPageComponent implements OnInit {

  communityName: string[] = new Array<string>();
  temp: string = "";
  private i: number = 0;
  private formdata = new FormData();

  constructor(private _storageService: LocalStorageService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }



  fields = [{ id: 'one', value: "Member" }]
  form = new FormGroup({})


  onSubmit(event: any) {

    for (this.i = 0; this.i < 2; this.i++) {
      const temp = "player" + this.i ;
      console.log(event.target.temp.value);
     // console.log(event.target.player1.value);
    }
  }

  ngOnInit(): void {

    this.fields.pop();

    if (this._storageService.get("communityNames") != "") {

      this.communityName = this._storageService.get("communityNames").toString().split(",");
      console.log(this.communityName);

      for (this.i = 0; this.i < this.communityName.length; this.i++) {
        var field = {
          id: this.communityName[this.i],
          value: "Chairman"
        };
        this.fields.push(field);
      }


    }

    this.fields.forEach(x => {
      this.form.addControl(x.id, new FormControl(x.value, Validators.required))
    });
    // console.log(this._storageService.get("UserId") + " " + this._storageService.get("communityNames"));
  }

  assignSubmit() {
    console.log(JSON.stringify(this.form.value));
    this.formdata.append('roles', JSON.stringify(this.form.value));
    this.formdata.append('id', this._storageService.get("userId").toString());



    this.authenticationService.acceptAndAssignUserCommunityRole(this.formdata).subscribe(
      data => {
 
      this.toastr.success('', "Save Successfully");
        
        this.clearData();
      },
      error => {
        this.clearData();
        this.toastr.error("An error has occured", "Error");
      }
    );


  }

  clearData() {

    this.formdata.delete("roles");
    this.formdata.delete("id");
  }

}
