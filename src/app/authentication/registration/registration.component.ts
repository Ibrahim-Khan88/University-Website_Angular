import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  public formdata = new FormData();
  myControl = new FormControl();
  filteredOptions: Observable<Object[]> | undefined;
  communityName: string[] = new Array<string>();
  selectedCommunity: string[] = new Array<string>();
  deptName: string[] = new Array<string>();
  roomNumber: string[] = new Array<string>();
  private selectedCommunityString: string = "";
  private j: number = 0;
  private i: number = 0;
  private addCommunity: boolean = false;
  public bookFile: any = File;
  community = new FormControl('');

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private elementRef: ElementRef,
    private toastr: ToastrService) {


    this.registrationForm = formBuilder.group({
      'name': [null, Validators.required],
      'password': [null, Validators.required],
      'email': [null, Validators.required],
      'designation': [null],
      'department_name': [null],
      'room_number': [null],
      'phone': [null],
      'filename': [null, Validators.required],
      'website': [null],
      'biographyFiledOfSpecialization': [null],
      'researchInterest': [null],
      'currentResearchAndCollaboration': [null],
      'fellowshipOfScientificAndProfessionalSociaties': [null],
      'educationExperience': [null],
      'teachingExperience': [null],
      'researchExperience': [null],
      'awardAndRecognition': [null],
      'publication': [null],
      'journals': [null],
      'conference': [null],
      'graduateSupervision': [null],
      'courseOffered': [null],
      'courseMaterial': [null],
      'roles': [null],
      'email_verified_at': [null]
    });


  }

  ngOnInit(): void {

    this.communityName = new Array<string>();
    this.selectedCommunity = new Array<string>();
    this.communityName = ["Reject Board", "Academic Council", "Sheikh Rasal Hall"];

    this.fetchDept();
    this.fetchRoom();

    //this.registrationForm.phone.setValue('abc');

    this.registrationForm.patchValue({
      name: "Mr x",
      password: "11",
      email: "ebrahimkhanobak@gmail.com",
      designation: "Associate Professor",
      department_name: "Computer Science and Engineering",
      room_number: "407 Academic Building",
      currentResearchAndCollaboration: "dummy value",
      phone: "dummy value",
      website: "dummy value",
      biographyFiledOfSpecialization: "dummy value",
      researchInterest: "dummy value",
      fellowshipOfScientificAndProfessionalSociaties: "dummy value",
      educationExperience: "dummy value",
      teachingExperience: "dummy value",
      researchExperience: "dummy value",
      awardAndRecognition: "dummy value",
      publication: "dummy value",
      journals: "dummy value",
      conference: "dummy value",
      graduateSupervision: "dummy value",
      courseOffered: "dummy value",
      courseMaterial: "dummy value",
      roles: "dummy value"
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: String): Object[] {

    const filterValue = value.toLowerCase();
    return this.communityName.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#EDF1F6';
  }

  

  registrationFormSubmit() {

    if (this.registrationForm.valid) {

      for (this.i = 0; this.i < this.selectedCommunity.length; this.i++) {

        if (this.selectedCommunityString == "")
          this.selectedCommunityString += this.selectedCommunity[this.i];
        else
          this.selectedCommunityString += "," + this.selectedCommunity[this.i];

      }

      this.registrationForm.patchValue({
        roles: this.selectedCommunityString
      });

      this.formdata.append('Object', JSON.stringify(this.registrationForm.value));
      this.formdata.append('photo', this.bookFile);

      console.log("Comunity Object====" + this.formdata.get("Object"));
      console.log("SelectedCommunityString====" + this.selectedCommunityString);

      this.authenticationService.saveRegistration(this.formdata).subscribe(
          data => {

          this.toastr.success('We will notify you within 24 hours', "Request Accepted");
            console.log(data);
            
            this.clearData();
          },
          error => {
            this.clearData();
            this.toastr.error("An error has occured", "Error");
          }
        );

    }
    else {
      let key = Object.keys(this.registrationForm.controls);

      key.filter(data => {
        let control = this.registrationForm.controls[data];

        if (control.errors != null) {
          control.markAllAsTouched();
        }
      });
    }


  }


  clearData() {
    this.selectedCommunityString = "";
    this.selectedCommunity = [];

    this.formdata.delete("Object");
    this.formdata.delete("photo");
  }


  fetchDept() {
    this.authenticationService.fetchDepartment().subscribe(
      data => {
        this.deptName = data;
      },
      error => {
        //this.toasterService.Error("Error", error.error); 
      }
    );
  }

  fetchRoom() {
    this.authenticationService.fetchRoom().subscribe(
      data => {
        this.roomNumber = data;
      },
      error => {
        //this.toasterService.Error("Error", error.error); roomNumber
      }
    );
  }



  selectedValue(select: string) {

    this.myControl.setValue("");
    this.addCommunity = true;

    for (this.j = 0; this.j < this.selectedCommunity.length; this.j++) {

      if (this.selectedCommunity[this.j] == select)
        this.addCommunity = false;

    }

    if (this.addCommunity)
      this.selectedCommunity.push(select);

    // if (this.selectedRole == "") this.selectedRole += select;
    // else this.selectedRole += "," + select ;

    console.log(this.selectedCommunity);

  }

  deleteSelectedCommunity(select: string) {
    this.selectedCommunity =
      this.selectedCommunity.filter(m => m != select);
  }


  onselectfile(event: any) {
    const file = event.target.files[0];
    this.bookFile = file;

  }

}
