import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import { Observable } from "rxjs/Observable";

const httpOptionHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

const apiUrl = environment.APIURL;

const cookieOptions ={
  httpOnly:true
}

@Injectable()
export class AuthService {
  private globals:object;
  globalChange : Observable<any>;
  private changeGlobal : Observer<any>

  constructor(private http: HttpClient,private cookieServ : CookieService) { 
    this.globalChange = Observable.create((observer:Observer<any>)=>{
      this.changeGlobal = observer;
    })
  }

  setGlobal(){
    this.changeGlobal.next(this.cookieServ.getObject("global"));
  }
   getGlobal(){
    return this.globals;    
  }

  checkAuth(){
   return this.cookieServ.getObject("global");
  }

  private handlesSuccess(res : Response){
    return res;
  }

  private handlesErrors(err : Response){
    return Observable.throw(err.statusText);
  }

  login(data : object){
    return this.http.post(apiUrl+"login",data,{headers:httpOptionHeaders}).map((res : Response) => {
      if(res)
      {
        this.cookieServ.putObject("global",res,cookieOptions);
        console.log(this.cookieServ);
        return res;
      }
    }).catch(this.handlesErrors)
  }

  register(data : object){
    return this.http.post(apiUrl+"login",data,{headers:httpOptionHeaders}).map(this.handlesSuccess).catch(this.handlesErrors)
  }

  logout(){    
    this.cookieServ.remove("global",cookieOptions);
    return true;
  }


  
}
