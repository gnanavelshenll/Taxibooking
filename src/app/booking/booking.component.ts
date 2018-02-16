// Booking and ride page component
import { OnInit, Component,Directive, forwardRef, Attribute,OnChanges, SimpleChanges,Input } from '@angular/core';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { BookingModel } from './booking.model';
import { BookingService } from './booking.service';
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
import { LocationTaxiModel } from "../home/location.taxi.model";
import { GoogleplaceDirective } from '../directive/googleplace-directive';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers:[BookingModel,BookingService]
})
export class BookingComponent implements OnInit {

	
	// private availableRides$ : booking = [];
  private  bookingData : any;
  private sendData : object;
  private rideList$;
  private checkUser:boolean;
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
      private mapsAPILoader: MapsAPILoader,
      private booking: BookingModel,
      private auth:AuthService) {

        this.rideList$ = this.booking.availableRides;

        this.router.events.subscribe(e => {
          if(e instanceof NavigationStart)
          {
              if(this.auth.checkAuth()) {
                this.checkUser = true;
              }
              else {
                this.checkUser = false;
                console.log(this.checkUser);      
              }
          }
        });

      }

  	ngOnInit() {
     this.routerParams.queryParams.subscribe(params =>{
        console.log(params);
        if(!this.isEmpty(params))
        {
          // this.mapsAPILoader.load().then(()=>{
          //   let getLocationData = new google.maps.places.Autocomplete({input}, {}).getPlace();
          //   });
          this.bookingData = {
            startLocation:JSON.parse(params.pickAddress),
            dropLocation:JSON.parse(params.dropAddress),
            bookingTime: params.time
          };
          this.getDriverList();
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
      this.auth.globalChange.subscribe((data:any)=>{
        if(data && data.accessToken){
          this.checkUser=true;
        }
        else{
          this.checkUser=false;
        }
      });
  	}

  	getAddressOnChange(event,LocationCtrl){
      if(event)
      {
        if(LocationCtrl.name == "startlocation")
        {
          this.bookingData.startlocation = {address : event.formatted_address, latlng:{lat:event.geometry.location.lat(),lng:event.geometry.location.lng()}};
        }
        if(LocationCtrl.name == "droplocation")
        {
          this.bookingData.droplocation = {address : event.formatted_address, latlng:{lat:event.geometry.location.lat(),lng:event.geometry.location.lng()}};
        }
      }
  }

  //check if object is empty or not
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  private reloadDriverList(){
    this.sendData = {
      pickAddress:JSON.stringify(this.bookingData.startLocation),
      dropAddress:JSON.stringify(this.bookingData.startLocation),
      time:this.bookingData.bookingTime
    }
    this.router.navigate(['ride-booking'],{queryParams:this.sendData});
  }

  //Drivers list
  private getDriverList(){
    this.sendData = {
      sourceLat: this.bookingData.startLocation.latlng.lat,
      sourceLng: this.bookingData.startLocation.latlng.lng,
      mode:this.bookingData.bookingTime
    }
      this.bookingService.getAvailableRides(this.sendData).subscribe(res => {
      if(Array.isArray(res)){
        this.rideList$  = res;       
      }
    },err => {
      console.error("Error::"+ err);
    })
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
