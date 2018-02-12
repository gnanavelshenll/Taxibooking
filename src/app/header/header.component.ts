import { OnInit, Component,Directive, forwardRef, Attribute,OnChanges, SimpleChanges,Input } from '@angular/core';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { HeaderModel } from './header.models';
import { HeaderService } from './header.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private header:HeaderModel, private headerService : HeaderService) { }

  ngOnInit() {
  }
  loading = false;
  loginRes;
  get
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  model = new User('','',null,'','','','');
  loginData =  this.header.login;
  registrationData =  this.header.registration;
  loginSubmitted = false;
  registrationSubmitted = false;
  onSubmit() { this.registrationSubmitted = true; }
  loginSubmit() {
   console.log(this.loginData);
  this.headerService.login(this.loginData).subscribe(data => {
    console.log(data);
  });
   console.log(this.loginRes);
  }

}



export class User{

    constructor(
        public name:string,
        public email: string,
        public mobile: number,
        public gender: string,
        public password: any,
        public confirmPassword: any,
        public usertype:any
    ){}
}