import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-type-select',
  templateUrl: './registration-type-select.component.html',
  styleUrls: ['./registration-type-select.component.css']
})
export class RegistrationTypeSelectComponent implements OnInit {

  constructor( private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#EDF1F6';
  }

  toRegistration(){
    this.router.navigate(["/auth/registration"]);
  }

}
