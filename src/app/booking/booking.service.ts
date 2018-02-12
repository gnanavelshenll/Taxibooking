import { Injectable } from '@angular/core';
import { BookingModel } from './booking.model';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";


@Injectable()
export class BookingService {

	private serverUrl = "http://localhost:8080";
	private bookingModel : BookingModel;
	constructor(private http:Http) { };

	getAvailableRides(data:any): Observable<any>{
		return data;
		// return this.http.post(this.serverUrl+"getRides").map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	};
};
