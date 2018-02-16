// Header Bar Component
import { OnInit, Component,Directive, forwardRef, Attribute,OnChanges, SimpleChanges,Input,ViewChild,ElementRef } from '@angular/core';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { LoginModel,RegistrationModel } from './header.models';
import { HeaderService } from './header.service';
import { Router, ActivatedRoute,NavigationStart } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { CookieService } from 'ngx-cookie';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[LoginModel,RegistrationModel,HeaderService]
})
export class HeaderComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private headerLogin: LoginModel, private headerRegistration: RegistrationModel, private headerService :  HeaderService,private cookieServ : CookieService,private router : Router, private auth : AuthService) {
    //Authorization
    this.router.events.subscribe(e => {
      if(e instanceof NavigationStart)
      {
          if(this.auth.checkAuth()) {
            this.hideRegLogin = true;
          }
          else {
            this.hideRegLogin = false;
            console.log(this.hideRegLogin);      
          }          
      }
    });
  }

  setTimer = new Date().setMinutes(70);

  loading = false;
  hideRegLogin = false;
  loginRes : Observable<any>;
  registrationRes : Observable<any>;
  loginData=  this.headerLogin;
  registrationData =  this.headerRegistration;
  loginSubmitted = false;
  registrationSubmitted = false;
  cookiesOpt = {
    httpOnly:true,
    // expires: new Date(this.setTimer)
  }

  //login func
  loginSubmit() {
    this.auth.login(this.loginData.login).subscribe(res => {
      if(res){
        this.loginRes = res;
        if(res.accessToken)
        {
          this.hideRegLogin = true;
          this.closeModal();
        }
          
        console.log("loginRes",this.auth.getGlobal());
      }
    },err => {
      console.error("Error::"+ err);
    });
  }

  private closeModal(): void { this.closeBtn.nativeElement.click(); }

  //registration func
  registerSubmit() {
    this.auth.register(this.registrationData).subscribe(res => {
      if(res){
        this.registrationRes = res;
        console.log("registrationRes",this.registrationRes);
      }      
    },err => {
      console.error("Error::"+ err);
    })
  }

  getForm(form){
    console.log(form);
  }

  //logout
  logout() {
    if(this.auth.logout())
      this.hideRegLogin = false;
  }

  ngOnInit() {
    
  }

}