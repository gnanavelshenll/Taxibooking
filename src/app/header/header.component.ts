import { OnInit, Component,Directive, forwardRef, Attribute,OnChanges, SimpleChanges,Input } from '@angular/core';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  loading = false;
 
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  model = new User('','',null,'','','','');
  submitted = false;
  onSubmit() { this.submitted = true; }
  newHero() {
   // this.model = new User('','');
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