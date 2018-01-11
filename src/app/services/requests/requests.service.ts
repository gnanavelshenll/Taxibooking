import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/retry';

@Injectable()
export class RequestsService {

  constructor(private http: Http) { }


  getData(url) {

      return this.http.get(url);
  }

  postData(url, post_values) {

        let json = JSON.stringify(post_values);
        let params = 'post_data=' + json;
        // let params = json;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(url, params, {
            headers : headers
        });

        // .subscribe(
        //   res => {
        //     console.log(res);
        //   },
        //   err => {
        //     console.log(err.error.message);
        //     console.log("Error occured");
        //   }
        // );
   }
   test () {
     return 'test';
   }

}
