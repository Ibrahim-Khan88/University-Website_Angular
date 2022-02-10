import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthenticationService } from '../Service/authentication.service';

import * as $ from 'jquery';

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
  designationName: string[] = new Array<string>();
  roomNumber: string[] = new Array<string>();
  private selectedCommunityString: string = "";
  private addCommunity: boolean = false;
  private j: number = 0;
  private i: number = 0;

  public imageFile: any = File;
  community = new FormControl('');
  public addressForm: FormGroup;
  public addressesval: FormArray | undefined;
  public awardAndRecognitions: FormArray | undefined;
  public conferences: FormArray | undefined;
  public courseMaterials: FormArray | undefined;
  public courseOffereds: FormArray | undefined;
  public currentResearchAndCollaborations: FormArray | undefined;
  public educationExperiences: FormArray | undefined;
  public graduateSupervisions: FormArray | undefined;
  public journalss: FormArray | undefined;
  public publications: FormArray | undefined;
  public researchExperiences: FormArray | undefined;
  public teachingExperiences: FormArray | undefined;



  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private elementRef: ElementRef,
    private toastr: ToastrService) {


    this.addressForm = this.formBuilder.group({
      thana: [''],
      addresses: this.formBuilder.array([this.formBuilder.control('')])
    });


    this.registrationForm = formBuilder.group({
      'name': [null, Validators.required],
      'password': [null, Validators.required],
      'email': [null, Validators.required],
      'designation_name': [null],
      'department_name': [null],
      'room_number': [null],
      'category_name': [null],
      'grade_name': [null],
      'phone': [null],
      'filename': [null, Validators.required],
      'website': [null],
      'biographyFiledOfSpecialization': [null],
      'awardAndRecognitions': this.formBuilder.array([this.formBuilder.control('')]),
      'conferences': this.formBuilder.array([this.formBuilder.control('')]),
      'courseMaterials': this.formBuilder.array([this.formBuilder.control('')]),
      'courseOffereds': this.formBuilder.array([this.formBuilder.control('')]),
      'currentResearchAndCollaborations': this.formBuilder.array([this.formBuilder.control('')]),
      'educationExperiences': this.formBuilder.array([this.formBuilder.control('')]),
      'graduateSupervisions': this.formBuilder.array([this.formBuilder.control('')]),
      'journalss': this.formBuilder.array([this.formBuilder.control('')]),
      'publications': this.formBuilder.array([this.formBuilder.control('')]),
      'researchExperiences': this.formBuilder.array([this.formBuilder.control('')]),
      'teachingExperiences': this.formBuilder.array([this.formBuilder.control('')]),
    });


  }

  ngOnInit(): void {

    this.communityName = new Array<string>();
    this.selectedCommunity = new Array<string>();
    this.communityName = ["Reject Board", "Academic Council", "Sheikh Rasal Hall"];

    this.fetchDept();
    this.fetchRoom();
    this.fetchDesignation();

    //this.registrationForm.phone.setValue('abc');

    this.registrationForm.patchValue({
      name: "Mr x",
      password: "11",
      email: "ebrahimkhanobak@gmail.com",
      designation_name: "Professor",
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


  }



  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#EDF1F6';
  }


  createAddress(): FormGroup {
    return this.formBuilder.group({
      address: '',
      street: '',
      city: '',
      country: ''
    });
  }

  get addressControls() {
    return this.addressForm.get('addresses') as FormArray;
    // return null;
  }


  addField(modelName: string): void {
    if (modelName == "awardAndRecognitions") {
      this.awardAndRecognitions = this.registrationForm.get('awardAndRecognitions') as FormArray;
      this.awardAndRecognitions.push(this.formBuilder.control(''));
    }
    else if (modelName == "conferences") {
      this.conferences = this.registrationForm.get('conferences') as FormArray;
      this.conferences.push(this.formBuilder.control(''));
    }
    else if (modelName == "courseMaterials") {
      this.courseMaterials = this.registrationForm.get('courseMaterials') as FormArray;
      this.courseMaterials.push(this.formBuilder.control(''));
    }
    else if (modelName == "courseOffereds") {
      this.courseOffereds = this.registrationForm.get('courseOffereds') as FormArray;
      this.courseOffereds.push(this.formBuilder.control(''));
    }
    else if (modelName == "currentResearchAndCollaborations") {
      this.currentResearchAndCollaborations = this.registrationForm.get('currentResearchAndCollaborations') as FormArray;
      this.currentResearchAndCollaborations.push(this.formBuilder.control(''));
    }
    else if (modelName == "educationExperiences") {
      this.educationExperiences = this.registrationForm.get('educationExperiences') as FormArray;
      this.educationExperiences.push(this.formBuilder.control(''));
    }
    else if (modelName == "graduateSupervisions") {
      this.graduateSupervisions = this.registrationForm.get('graduateSupervisions') as FormArray;
      this.graduateSupervisions.push(this.formBuilder.control(''));
    }
    else if (modelName == "journalss") {
      this.journalss = this.registrationForm.get('journalss') as FormArray;
      this.journalss.push(this.formBuilder.control(''));
    }
    else if (modelName == "publications") {
      this.publications = this.registrationForm.get('publications') as FormArray;
      this.publications.push(this.formBuilder.control(''));
    }
    else if (modelName == "researchExperiences") {
      this.researchExperiences = this.registrationForm.get('researchExperiences') as FormArray;
      this.researchExperiences.push(this.formBuilder.control(''));
    }
    else if (modelName == "teachingExperiences") {
      this.teachingExperiences = this.registrationForm.get('teachingExperiences') as FormArray;
      this.teachingExperiences.push(this.formBuilder.control(''));
    }

  }

  removeField(modelName: string) {
    if (modelName == "awardAndRecognitions")
      this.awardAndRecognitions?.removeAt(this.awardAndRecognitions.length - 1);
    else if (modelName == "conferences")
      this.conferences?.removeAt(this.conferences.length - 1);
    else if (modelName == "courseMaterials")
      this.courseMaterials?.removeAt(this.courseMaterials.length - 1);
    else if (modelName == "courseOffereds")
      this.courseOffereds?.removeAt(this.courseOffereds.length - 1);
    else if (modelName == "currentResearchAndCollaborations")
      this.currentResearchAndCollaborations?.removeAt(this.currentResearchAndCollaborations.length - 1);
    else if (modelName == "educationExperiences")
      this.educationExperiences?.removeAt(this.educationExperiences.length - 1);
    else if (modelName == "graduateSupervisions")
      this.graduateSupervisions?.removeAt(this.graduateSupervisions.length - 1);
    else if (modelName == "journalss")
      this.journalss?.removeAt(this.journalss.length - 1);
    else if (modelName == "publications")
      this.publications?.removeAt(this.publications.length - 1);
    else if (modelName == "researchExperiences")
      this.researchExperiences?.removeAt(this.researchExperiences.length - 1);
    else if (modelName == "teachingExperiences")
      this.teachingExperiences?.removeAt(this.teachingExperiences.length - 1);
  }

  logValue() {
    console.log(JSON.stringify(this.addressForm.value));
  }


  addAddress(): void {

    this.addressesval = this.addressForm.get('addresses') as FormArray;
    this.addressesval.push(this.formBuilder.control(''));

  }

  removeAddress() {
    this.addressesval?.removeAt(this.addressControls.length - 1);
  }


  registrationFormSubmit() {

    if (this.registrationForm.valid) {

      this.loadingOpen();

      this.registrationForm.patchValue({
        grade_name: 1,
        category_name: "Faculty Member",
      });


      console.log(JSON.stringify(this.registrationForm.value));


      this.formdata.append('Object', JSON.stringify(this.registrationForm.value));
      this.formdata.append('photo', this.imageFile);

      //   console.log("Comunity Object====" + this.formdata.get("Object"));
      //   console.log("SelectedCommunityString====" + this.selectedCommunityString);

      this.authenticationService.saveRegistration(this.formdata).subscribe(
        data => {


          this.loadingClose();
          this.toastr.success('We will notify you within 24 hours', "Request Accepted");
          console.log(data);

          this.clearData();
        },
        error => {
          this.loadingClose();
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

  fetchDesignation() {
    this.authenticationService.fetchDesignation().subscribe(
      data => {
        this.designationName = data;
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








  onselectfile(event: any) {
    const file = event.target.files[0];
    this.imageFile = file;

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



  get awardAndRecognitionsControls() {
    return this.registrationForm.get('awardAndRecognitions') as FormArray;
  }

  get conferencesControls() {
    return this.registrationForm.get('conferences') as FormArray;
  }

  get courseMaterialsControls() {
    return this.registrationForm.get('courseMaterials') as FormArray;
  }

  get courseOfferedsControls() {
    return this.registrationForm.get('courseOffereds') as FormArray;
  }

  get currentResearchAndCollaborationsControls() {
    return this.registrationForm.get('currentResearchAndCollaborations') as FormArray;
  }

  get educationExperiencesControls() {
    return this.registrationForm.get('educationExperiences') as FormArray;
  }

  get graduateSupervisionsControls() {
    return this.registrationForm.get('graduateSupervisions') as FormArray;
  }

  get journalssControls() {
    return this.registrationForm.get('journalss') as FormArray;
  }

  get publicationsControls() {
    return this.registrationForm.get('publications') as FormArray;
  }

  get researchExperiencesControls() {
    return this.registrationForm.get('researchExperiences') as FormArray;
  }

  get teachingExperiencesControls() {
    return this.registrationForm.get('teachingExperiences') as FormArray;
  }


  // deleteSelectedCommunity(select: string) {
  //   this.selectedCommunity =
  //     this.selectedCommunity.filter(m => m != select);
  // }

  // selectedValue(select: string) {

  //   this.myControl.setValue("");
  //   this.addCommunity = true;

  //   for (this.j = 0; this.j < this.selectedCommunity.length; this.j++) {

  //     if (this.selectedCommunity[this.j] == select)
  //       this.addCommunity = false;

  //   }

  //   if (this.addCommunity)
  //     this.selectedCommunity.push(select);
  // }

  // this.filteredOptions = this.myControl.valueChanges
  // .pipe(
  //   startWith(''),
  //   map(value => this._filter(value))
  // );

  // private _filter(value: String): Object[] {

  //   const filterValue = value.toLowerCase();
  //   return this.communityName.filter(option => option.toLowerCase().includes(filterValue));
  // }


}


// 'researchInterest': [null],
//       'currentResearchAndCollaboration': [null],
//       'fellowshipOfScientificAndProfessionalSociaties': [null],
//       'educationExperience': [null],
//       'teachingExperience': [null],
//       'researchExperience': [null],
//       'awardAndRecognition': [null],
//       'publication': [null],
//       'journals': [null],
//       'conference': [null],
//       'graduateSupervision': [null],
//       'courseOffered': [null],
//       'courseMaterial': [null],
//       'roles': [null],
//       'email_verified_at': [null]


