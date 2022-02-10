import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication/Service/authentication.service';
import { UsersRegistrationRequest } from 'src/app/Models/UsersRegistrationRequest';
import { LocalStorageService } from 'ngx-localstorage';
import { CommunityService } from 'src/app/Services/community.service';
import { User } from 'src/app/Models/User';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { Option } from 'src/app/Models/Option';
import { NoticeBoardService } from 'src/app/Services/notice-board.service';
import { NoticeBoard } from 'src/app/Models/NoticeBoard';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {

  userRegistrationRequest: UsersRegistrationRequest[] = [];
  communityName: String[] = [];
  deptName: String[] = [];
  communityMember: User[] = [];
  allUserForAddMember: User[] = [];
  private formdata: FormData = new FormData();



  private i: number = 0;
  private j: number = 0;
  myControl = new FormControl();
  filteredOptions: Observable<Option[]> | undefined;
  private addMemberCheck: boolean = false;
  selectedMemberForAddMember: User[] = [];
  noticeBoard: NoticeBoard[] = [];
  selected: any[] = [];
  selectedMemberId: string = "";
  selectedRoleForMember: string = "";
  public accessCommunity: string[] = [];
  public user: User = new User();
  public loginUser: User = new User();
  public connectedCommunityForPost: string[] = [];
  public useId: string = "";
  public userType = 0;


  public community: boolean = false;
  public notice: boolean = false;
  public post: boolean = false;
  public dashboard: boolean = false;
  public departmentAdmin: boolean = false;
  public userRegistrationRequestShow: boolean = false;
  public selectedCommunityName: string = "Academic Council";
  postForm: FormGroup;
  public category: string[] = ["Student", "Faculty Member", "Staff", "All"];
  public departmentAdminfeature: string[] = ["Student Attendance", "Student Result", "Routine", "Syllabus", "Arrange Metting", "Others"];

  public sectionShowArray: boolean[] = [true, false, false, false];



  constructor(
    private authenticationService: AuthenticationService,
    private communityService: CommunityService,
    private router: Router,
    private toastr: ToastrService,
    private _storageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private noticeService: NoticeBoardService) {


    this.postForm = formBuilder.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required],
      'category_name': [null],
      'community_name': [null],
    });

  }

  ngOnInit(): void {

    this.initializeUserData();


    //this.selectedMemberForAddMember = new Array<string>();
    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );

  }
  initializeUserData() {
    this.userTypeFun()

    if (this._storageService.get("user") == null) {
      this.router.navigate([""]);
    }

    this.loginUser = this._storageService.get("user");
    this.connectedCommunityForPost = this._storageService.get("accessCommunity").toString().split(",");

    this.category.forEach(value => {
      this.connectedCommunityForPost.push(value);
    });

    this.connectedCommunityForPost.forEach((element, index) => {
      if (element == "SuperAdmin") this.connectedCommunityForPost.splice(index, 1);
    });

    if(this.userType == 2 || this.userType == 3)
    this.fetchNotice();
    else
    this.fetchUserRegistrationRequest();

  }



  clearData() {
    this.formdata.delete;
    this.postForm.patchValue({
      title:"",
      body:"",
      community_name:null,
      category_name:null
    })
  }


  postFormSubmit() {

    this.loadingOpen();

    if (this.category.indexOf(this.postForm.get("community_name")?.value) != -1) {
      this.postForm.patchValue({
        category_name: this.postForm.get("community_name")?.value,
        community_name: null
      });
    }
    else {
      this.postForm.patchValue({
        category_name: null,
        community_name: this.postForm.get("community_name")?.value
      });
    }

    // console.log(JSON.stringify(this.postForm.value));
    this.noticeService.saveNotice(this.postForm.value, this.loginUser.id).subscribe(
      data => {
        this.toastr.success("Posted successfully", "Success");
        this.loadingClose();
        this.clearData();
      },

      error => {
        this.loadingClose();
        this.clearData();
        this.toastr.error("An error has occured", "Error");
      }
    );
  }



  fetchNotice() {

    this.sectionShow(2);

    this.loadingOpen();

    this.noticeService.fetchNotice(this.loginUser.id).subscribe(
      data => {
        this.noticeBoard = data;
        this.loadingClose();
      },

      error => {
        this.loadingClose();
        this.toastr.error("An error has occured", "Error");
      }
    );

  }



  fetchUserRegistrationRequest() {

    this.authenticationService.fetchUserRegistrationRequest(this.loginUser.id).subscribe(
      data => {
        this.userRegistrationRequest = data;
      },

      error => {
        this.toastr.error("An error has occured", "Error");
      }
    );

  }


  sectionShow(value: number) {

    if(value == 0 && this.userType != 1){
      value = 2;
    }
    for (this.i = 0; this.i < this.sectionShowArray.length; this.i++) {
      this.sectionShowArray[this.i] = false;
    }
    this.sectionShowArray[value] = true;
  }



  isAcceptRequest(memberId: Number, isAccept: string) {

    this.formdata?.set("memberId", memberId.toString());
    this.formdata?.set("isAccept", isAccept);

    this.loadingOpen();

    this.authenticationService.registrationRequestResponse(this.formdata).subscribe(
      data => {

        this.fetchUserRegistrationRequest();
        this.loadingClose();
        this.toastr.success("Success");
      },
      error => {
        this.loadingClose();
        this.toastr.error("An error has occured", "Error");
      }
    );

    // this._storageService.set("userId", id);
    // //this._storageService.set("communityNames", names);
    // console.log(this._storageService.get("UserId") + " " + this._storageService.get("communityNames"));
    // this.router.navigate(["/admin/userdetail"]);
  }


  userTypeFun() {
    if (this._storageService.get("department-admin") == true)
      this.userType = 1;
    else if (this._storageService.get("at-leastone") == true)
      this.userType = 2;
    else if (this._storageService.get("only-read") == true)
      this.userType = 3;

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

}



// displayFun(subject:any){
//   return subject ? subject.name : undefined;
// }

// private _filter(value: String): User[] {

//   const filterValue = value.toString().toLowerCase();
//       return this.allUserForAddMember.filter(option => option.name.toString().toLowerCase().includes(filterValue) );
//   // return this.options.filter(option => String(option.id).toLowerCase().indexOf(filterValue ) > -1 || 
//   // option.name.toLowerCase().indexOf(filterValue ) > -1);
//   //return this.objectOption.filter(option => option.toLowerCase().includes(filterValue));
// }

// selectedMember(select: User) {

//  this.myControl.setValue("");
//   this.addMemberCheck = true;

//   for (this.j = 0; this.j < this.selectedMemberForAddMember.length; this.j++) {

//     if (this.selectedMemberForAddMember[this.j] == select)
//       this.addMemberCheck = false;

//   }

//   if (this.addMemberCheck)
//     this.selectedMemberForAddMember.push(select);

//  // console.log(select.name + " " + select.id);

// }

// deleteSelectedMember(select: User) {
//   this.selectedMemberForAddMember =
//     this.selectedMemberForAddMember.filter(m => m != select);
// }
