import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { LocationTaxiModel } from './location.taxi.model';
//import { GoogleplaceDirective } from '../directive/googleplace-directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public startlocation : LocationTaxiModel;
  public droplocation : LocationTaxiModel;
  public pickupTime : any;
 

  constructor(meta: Meta, title: Title, private router : Router) { 

    title.setTitle('My Home Page');

    meta.addTags([ 
      {
        name: 'author', content: 'Coursetro.com'
      },
      {
        name: 'keywords', content: 'angular 4 tutorial, angular seo'
      },
      {
        name: 'description', content: 'This is my great description.'
      },
    ])
    this.startlocation= new LocationTaxiModel();
    this.droplocation= new LocationTaxiModel();
  }

  ngOnInit() {
  }

  getAddressOnChange(event,LocationCtrl)
  {
    console.log("event",event);
    if(event)
    {
      if(LocationCtrl.name == "startlocation")
      {
        this.startlocation = {address : event.formatted_address, latlng:{lat:event.geometry.location.lat(),lng:event.geometry.location.lng()}};
      }
      if(LocationCtrl.name == "droplocation")
      {
        this.droplocation = {address : event.formatted_address, latlng:{lat:event.geometry.location.lat(),lng:event.geometry.location.lng()}};
      }
    }
    
    console.log("location",this.startlocation);
    console.log("location",this.droplocation);    
  }
 
  goToBooking()
  {
    if(!this.isEmpty(this.startlocation) && !this.isEmpty(this.droplocation) && this.pickupTime)
    {
      console.log(this.startlocation);
      var sendParams = {
        start:encodeURI(this.startlocation.address),
        stop:encodeURI(this.droplocation.address),
        time:this.pickupTime
      };
      console.log(sendParams);
      this.router.navigate(['ride-booking',this.startlocation.address,this.droplocation.address,this.pickupTime]);
      // {queryParams:{start:JSON.stringify(this.startlocation),stop:JSON.stringify(this.droplocation),time:this.pickupTime}}
    }
    else
    {
      if((this.isEmpty(this.startlocation)))
        alert('Enter a start location');
      else if(this.isEmpty(this.droplocation))
        alert('Enter a drop location');
      else if(!this.pickupTime)
      {
        alert('select a pick up time');
        console.log(this.startlocation,this.droplocation);
      }
    }
  }
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
}
