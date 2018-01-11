import { Component, OnInit } from '@angular/core';
import { RequestsService } from "../services/requests/requests.service";
import { TestDirective } from "../directive/test.directive";
import { LoopdirectiveDirective } from "../directive/loopdirective.directive";
import 'rxjs/add/operator/retry';

declare var google: any;

@Component({
  selector: 'app-bookride',
  templateUrl: './bookride.component.html',
  styleUrls: ['./bookride.component.css'],
  // providers: [RequestsService]
})
export class BookrideComponent implements OnInit {

  public location: Object;
  public droplocation: Object;

  public startPointLat: number;
  public startPointLng: number;
  public endPointLat: number;
  public endPointLng: number;

  public source: string;
  public destination: string;
  public distance: any;

  public service: any;

  posturl = "http://demo.shenll.net/taxibooking/api/locationdriverlist";

  constructor(public requestsService: RequestsService) { 
    // console.log(requestsService.test());
    
    // let loadPostDataRes = this.loadHttpPostData(this.posturl, {sourceLat: '13.034689', sourceLng: '80.210397', mode: 'NOW'});
  }


  ngOnInit() {
  }


  loadHttpPostData(url, post_values) {

        this.requestsService.postData(url, post_values)
        .retry(1)
        .subscribe(
            data => {
                console.log(data.json());
            },
            err => {

                if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
                } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log(`Backend returned code ${err.status}, body was: ${err.error.message}`);
                }


            }
        );
  }

  getAddressOnChange(event, LocationCtrl){

    if (LocationCtrl.name === "location") {
      this.source = event.formatted_address;
    } else {
      this.destination = event.formatted_address;
    }
    if ( (this.source !== "" && this.destination !== "") && (this.source !== undefined && this.destination !== undefined) ) {

      this.service = new google.maps.DistanceMatrixService();
      this.service.getDistanceMatrix({
          origins: [this.source],
          destinations: [this.destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
      }, function (response, status) {
          if (status === google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status !== "ZERO_RESULTS") {
              this.distance = response.rows[0].elements[0].distance.text;
              // alert(this.distance);

              // this.requestsService.postData(this.posturl, {sourceLat: '13.034689', sourceLng: '80.210397', mode: 'NOW'})
              // .retry(1)
              // .subscribe(
              //   data => {
              //     console.log(data);
              //   },
              //   err => {
              //     if (err.error instanceof Error) {
              //       // console.log('An error occurred:', err.error.message);
              //     } else {
              //       // console.log(`Backend returned code ${err.status}, body was: ${err.error.message}`);
              //     }
              //   }
              // );

              // alert(this.distance);
          } else {
              // console.log("Unable to find the distance via road.");
          }

      });

    }

  }

}
