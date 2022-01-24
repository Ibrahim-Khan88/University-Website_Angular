import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'University-Website-FrontEnd';


  sum = 100;
  array: number[] = [0, 1, 1, 1, 2, 2, 2, 3, 4, 5, 9, 10, 10];
  temparray: number[] = [];


  track: number = 0;
  temp1: number = 0; 
  temp2: number = 0;

  constructor(private toastr: ToastrService) {
    console.log("temparray " + this.findout([3, 5, -4, 8, 11, 1, -1, 6], 10));
  }
  ngOnInit(): void {
    //this.toastr.success('Hello world!', 'Toastr fun!');
  }


  reverseInteger(digit: number) {

    this.temp1 = digit;
    for (this.i = 0; this.i < 4; this.i++) {
      this.temp1 = digit % 10;
      console.log(this.temp1);
      this.temp2 = digit / 10;

      digit = this.temp2;
    }

  }

  i: number = 0;
  j: number = 0;
  temp: number = 0;
  teparray:number[] = []; 

  findout(numberArray: number[], sumTerget: number): number[] {

     for (this.i = 0; this.i < numberArray.length; this.i++) {


      this.temp = numberArray[this.i];
      for (this.j = 0; this.j < numberArray.length; this.j++) {

        if (this.i != this.j && ((numberArray[this.i] + numberArray[this.j]) == sumTerget)) {

          console.log("even ->" + numberArray[this.i] + " " + numberArray[this.j]) ;
          this.teparray.push(numberArray[this.i]);
          this.teparray.push(numberArray[this.j]);
          
          //return [numberArray[this.i], numberArray[this.j]];
          return this.teparray;
         

        }

      }
     }

    return [];

    }

  }
