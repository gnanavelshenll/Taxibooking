import { OnInit, Component,Directive, forwardRef, Attribute,OnChanges, SimpleChanges,Input } from '@angular/core';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { BookingModel } from './booking.model';
import { BookingService } from './booking.service';
import { Router, ActivatedRoute } from "@angular/router";
import { LocationTaxiModel } from "../home/location.taxi.model";
import { GoogleplaceDirective } from '../directive/googleplace-directive';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {

	private booking: BookingModel;
	public availableRides : Array<Object> = [];
  public  bookingData = {};
  private options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };
  private mapsApi;
    constructor(
      private router:Router, 
      private routerParams:ActivatedRoute, 
      private bookingService:BookingService,
      private mapsAPILoader: MapsAPILoader) {
      }

  	ngOnInit() {
     this.routerParams.queryParams.subscribe(params =>{
        console.log(params._value);
        if(!this.isEmpty(params._value))
        {
          // this.mapsAPILoader.load().then(()=>{
          //   let getLocationData = new google.maps.places.Autocomplete({input}, {}).getPlace();
          //   });
          this.bookingData = {
            startLocation:{address:JSON.parse(params.pickAddress)},
            dropLocation:{address:JSON.parse(params.dropAddress)},
            bookingTime: params.time
          };
        }
        else
        {
          this.bookingData = {
            startLocation:{address:''},
            dropLocation:{address:''},
            bookingTime:'',
          };
        }
      });
      
      console.log(this.bookingData);

  	}

  	getAddressOnChange(event,LocationCtrl){
    console.log("event",event);

    console.log("location",LocationCtrl);
  }

  getRides(){
  	console.log(this.bookingData);
  }
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  // private getPlaceData(input)
  // {
  //   this.mapsAPILoader.
  //   let getLocationData = new google.maps.places.Autocomplete({input}, {}).getPlace();
  //         // google.maps.event.addListener(this.getLocationData, 'place_changed', ()=> {
  //         //   var place = this.getLocationData.getPlace();
  //         //   return      
  //         // });
  // }

}
