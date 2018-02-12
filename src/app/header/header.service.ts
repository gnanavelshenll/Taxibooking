import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

const httpOptionsHeaders = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
};


const apiUrl = environment.APIURL;

@Injectable()
export class HeaderService {

  constructor(private http : HttpClient) { }

  login(data : object){
    return this.http.post(apiUrl+'login',data,httpOptionsHeaders);
  }

}
