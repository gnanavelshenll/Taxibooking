// Header Bar Service
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../services/auth.service";


const apiUrl = environment.APIURL;

@Injectable()
export class HeaderService {
  
  httpOptionsHeaders : object;

  constructor(private http : HttpClient, private cookieServ : CookieService,private auth : AuthService) { 

    this.httpOptionsHeaders = {
      headers : new HttpHeaders({'Content-Type':'application/json'}),
      Authorization: this.auth.getGlobal()
    };
  }

   
  
  

  private handlesSuccess(res: Response){
    return res;
  }

  private handlesErrors(err : Response){
    return Observable.throw(err.statusText);
  }

}
