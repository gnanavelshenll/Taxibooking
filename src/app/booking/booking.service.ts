// Bookin page service
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { Observer } from 'rxjs/Observer';

const httpOptionsHeaders = {headers:new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})};

const apiUrl = environment.APIURL;

@Injectable()
export class BookingService {
	constructor(private http:HttpClient, private http2:Http) { };

	private handlesSuccess(res: Response){
		return res;
	  }
	
	private handlesErrors(err : Response){
		return Observable.throw(err.statusText);
	  }

	getAvailableRides(data:object) : Observable<Array<object>>{
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
			  headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
			  headers.append('Access-Control-Allow-Origin', '*');
		return this.http2.post(apiUrl+'locationDriverList',data,{headers: headers}).map(this.handlesSuccess).catch(this.handlesErrors);
	};
};
