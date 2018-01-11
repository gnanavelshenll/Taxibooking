import { Injectable } from '@angular/core';
declare var google: any;

@Injectable()
export class LocationdataService {

  public source: string;
  public destination: string;
  public distance: any;
  public service: any;

  constructor() { }

  getLocationData(event, LocationCtrl) {

    if (LocationCtrl.name === "location") {
      this.source = event.formatted_address;
    } else {
      this.destination = event.formatted_address;
    }
    console.log('this.source', this.source);
    console.log('this.destination', this.destination);

    if ( (this.source !== '' && this.destination !== '') && (this.source !== undefined && this.destination !== undefined) ) {

      this.service = new google.maps.DistanceMatrixService();

      this.service.getDistanceMatrix({
          origins: [this.source],
          destinations: [this.destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
      }, function (response, status) {
          if (status === google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status !== 'ZERO_RESULTS') {
              this.distance = response.rows[0].elements[0].distance.text;
          } else {
              console.log('Unable to find the distance via road.');
          }
          this.test();
      });
    }
  }

  test() {
    console.log('callback');
  }

}
