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

import * as $ from 'jquery';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  userRegistrationRequest: UsersRegistrationRequest[] = [];
  communityName: String[] = [];
  deptName: String[] = [];
  communityMember: User[] = [];
  allUserForAddMember: User[] = [];
  private formdata: FormData = new FormData();


  
  private i:number = 0;
  private j:number = 0;
  myControl = new FormControl();
  filteredOptions: Observable<Option[]> | undefined;
  private addMemberCheck: boolean = false;
  selectedMemberForAddMember: User[] = [];
  noticeBoard: NoticeBoard[] = [];
  selected: any[] = [];
  selectedMemberId:string = "";
  selectedRoleForMember:string = "";
  public accessCommunity : string[] = [];
  public user : User = new User();
  public loginUser : User = new User();
  public connectedCommunityForPost : string[] = [];
  public useId : string = "";


  public community : boolean = false;
  public notice : boolean = false;
  public post : boolean = false;
  public dashboard : boolean = false;
  public departmentAdmin : boolean = false;
  public userRegistrationRequestShow : boolean = false;
  public selectedCommunityName : string = "Academic Council";
  postForm: FormGroup;
  public category:string[] = ["Student", "Faculty Member", "Staff", "All"];

  public sectionShowArray:boolean[] = [true, false, false, false, false, false, false, false];

  objectOption = [
   { name : "ibrahim"},
   { name : "rifat"},
   { name : "hasiv"},
   { name : "rabby"},
  ];


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
    this.roleInitializer();
    this.fetchUserRegistrationRequest();
    this.fetchCommunityName();
    this.fetchDeptName();
    this.fetchAllUser();
     
    //this.fetchCommunityMember("Academic Council");
    //this.removeMember(3);

    //this.selectedMemberForAddMember = new Array<string>();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }
  initializeUserData(){

    if(this._storageService.get("user") == null){
      this.router.navigate([""]);
    }

   this.loginUser = this._storageService.get("user");
   this.connectedCommunityForPost = this._storageService.get("accessCommunity").toString().split(",");

   this.category.forEach(value => {
    this.connectedCommunityForPost.push(value);
   });

   this.connectedCommunityForPost.forEach((element,index)=>{
    if(element=="SuperAdmin")this.connectedCommunityForPost.splice(index,1);
 });

  //  console.log("user-> " + this.loginUser.photo);
    //console.log("loginUser -> " + this.loginUser.id);
  }
  

  options : Option[] = [{name: 'ibrahim', id: 123},{name: 'rabby', id:142},{name: 'ibrfff', id:144}] 

  displayFun(subject:any){
    return subject ? subject.name : undefined;
  }

  private _filter(value: String): User[] {

    const filterValue = value.toString().toLowerCase();
        return this.allUserForAddMember.filter(option => option.name.toString().toLowerCase().includes(filterValue) );
    // return this.options.filter(option => String(option.id).toLowerCase().indexOf(filterValue ) > -1 || 
    // option.name.toLowerCase().indexOf(filterValue ) > -1);
    //return this.objectOption.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectedMember(select: User) {

   this.myControl.setValue("");
    this.addMemberCheck = true;

    for (this.j = 0; this.j < this.selectedMemberForAddMember.length; this.j++) {

      if (this.selectedMemberForAddMember[this.j] == select)
        this.addMemberCheck = false;

    }

    if (this.addMemberCheck)
      this.selectedMemberForAddMember.push(select);

   // console.log(select.name + " " + select.id);

  }

  deleteSelectedMember(select: User) {
    this.selectedMemberForAddMember =
      this.selectedMemberForAddMember.filter(m => m != select);
  }

  saveMember(){
    
    this.i = 0;
    this.selectedMemberForAddMember.forEach( (value) => {
      this.selectedMemberId += value.id + ",";
      this.selectedRoleForMember += this.selected[this.i++] + ",";
    });

    this.formdata?.set("memberIdList", this.selectedMemberId.slice(0, -1));
    this.formdata?.set("memberRoleList", this.selectedRoleForMember.slice(0, -1));
    this.formdata?.set("userId", this.loginUser.id.toString());
    this.formdata?.set("communityName", this.selectedCommunityName);

    this.communityService.saveCommunityUser(this.formdata).subscribe(
      data => {
        this.toastr.success("Successfully added", "Success");
        this.clearData();
      },
      error => {
        this.clearData();
        this.toastr.error("An error has occured", "Error");
      }
    );

    
    
  }

  clearData(){
    this.formdata.delete;
    this.roleInitializer();
    this.selectedRoleForMember = "";
    this.selectedMemberId = "";
  //  console.log(this.formdata.getAll);

  }


  postFormSubmit(){

    this.loadingOpen();
    
    if (this.category.indexOf(this.postForm.get("community_name")?.value) != -1 ){
      this.postForm.patchValue({
        category_name: this.postForm.get("community_name")?.value, 
        community_name :null
      });
    }
    else{
      this.postForm.patchValue({
        category_name: null, 
        community_name :this.postForm.get("community_name")?.value
      });
    }

   // console.log(JSON.stringify(this.postForm.value));
    this.noticeService.saveNotice(this.postForm.value, this.loginUser.id).subscribe(
      data => {
        this.toastr.success("Posted successfully", "Success");
        this.loadingClose();
      },

      error => {
        this.loadingClose();
        this.toastr.error("An error has occured", "Error");
      }
    );
  }


  addCommunityMemebrPage(value:number){
    this.sectionShow(value);
    this.selectedMemberForAddMember = [];
  }

  fetchAllUser(){


    this.communityService.fetchAllUser().subscribe(
      data => {
        this.allUserForAddMember = data;
        // for (this.i = 0; this.i < this.allUserForAddMember.length; this.i++) {
        //   console.log(this.allUserForAddMember[this.i].department_name + " \n")
        // }
      },

      error => {
        this.toastr.error("An error has occured", "Error");
      }
    );

  }


  fetchNotice(){

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


  fetchDeptName(){

    this.communityService.fetchDeptName().subscribe(
      data => {
        
        this.deptName = data;
      },
      error => {
        this.toastr.error("An error has occured", "Error");
      }
    );

  }

  fetchUserRegistrationRequest(){

    this.authenticationService.fetchUserRegistrationRequest(this.loginUser.id).subscribe(
      data => {
        this.userRegistrationRequest = data;
      },

      error => {
        this.toastr.error("An error has occured", "Error");
      }
    );

  }


  fetchCommunityMemberByCommunityName(communityName:string){

    this.selectedCommunityName = communityName;
    this.sectionShow(6);

    this.communityService.fetchCommunityMemberByCommunityName(communityName).subscribe(
      data => {
        this.communityMember = data;
        // for (this.i = 0; this.i < this.communityMember.length; this.i++) {
        //   console.log(this.communityMember[this.i].desigination_name + " \n")
        // }
      },

      error => {
        this.toastr.error("An error has occured", "Error");
      }
    );

  }


  removeMember(memberId:Number){
    this.communityService.deleteMember(this.selectedCommunityName, this.loginUser.id, memberId).subscribe(
      data => { 
        this.toastr.success("Successfully deleted", "Success");
        this.fetchCommunityMemberByCommunityName(this.selectedCommunityName)
      },
      error => {
        this.toastr.error("An error has occured", "Error");
      }
    );
  }




  sectionShow(value:number){
    for (this.i = 0; this.i < this.sectionShowArray.length; this.i++) {
      this.sectionShowArray[this.i] = false;
    }
    this.sectionShowArray[value] = true;
  }

  fetchCommunityName(){

    this.communityService.fetchCommunityName().subscribe(
      data => { 
        this.communityName = data;
      },
      error => {
        this.toastr.error("An error has occured", "Error");
      }
    );

  }

  isAcceptRequest(memberId:Number, isAccept:string){

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


  roleInitializer(){
    for (this.i=0; this.i<100; this.i++){
      this.selected[this.i] = "Member";
    }
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
