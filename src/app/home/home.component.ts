import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router,NavigationStart } from "@angular/router";
import { LocationTaxiModel } from './location.taxi.model';
//import { GoogleplaceDirective } from '../directive/googleplace-directive';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ LocationTaxiModel ]
})
export class HomeComponent implements OnInit {
  public startlocation : LocationTaxiModel;
  public droplocation : LocationTaxiModel;
  public pickupTime : any;
  private sendParams : object;
  private checkUser : boolean;

  constructor(meta: Meta, 
    title: Title, 
    private router : Router, 
    private auth : AuthService) { 

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

    //Authorization
    this.router.events.subscribe(e => {
      if(e instanceof NavigationStart)
      {
          if(this.auth.checkAuth()) {
            this.checkUser = true;
          }
          else {
            this.checkUser = false;
          }          
      }
      
    });

    this.startlocation= new LocationTaxiModel();
    this.droplocation= new LocationTaxiModel();
  }

  ngOnInit() {
    this.auth.globalChange.subscribe((data:any)=>{
      if(data && data.accessToken){
        this.checkUser=true;
      }
      else{
        this.checkUser=false;
      }
    });
  }

  getAddressOnChange(event,LocationCtrl)
  {
    console.log("event",event);
    if(event)
    {
      if(LocationCtrl.name == "startLocationCtrl")
      {
        this.startlocation = {address : event.formatted_address, latlng:{lat:event.geometry.location.lat(),lng:event.geometry.location.lng()}};
      }
      if(LocationCtrl.name == "dropLocationCtrl")
      {
        this.droplocation = {address : event.formatted_address, latlng:{lat:event.geometry.location.lat(),lng:event.geometry.location.lng()}};
      }
    }    
    console.log("location",this.startlocation);
    console.log("location",this.droplocation);    
  }
 
  goToBooking(formStatus:boolean)
  {
    if(formStatus)
    {
      console.log(this.startlocation);
       this.sendParams = {
        pickAddress:JSON.stringify(this.startlocation),
        dropAddress:JSON.stringify(this.droplocation),
        time:this.pickupTime
      };
      console.log(this.sendParams);
      this.router.navigate(['ride-booking'],{queryParams:this.sendParams});
      // {queryParams:{start:JSON.stringify(this.startlocation),stop:JSON.stringify(this.droplocation),time:this.pickupTime}}
    }
    // else
    // {
    //   if((this.isEmpty(this.startlocation)))
    //     alert('Enter a start location');
    //   else if(this.isEmpty(this.droplocation))
    //     alert('Enter a drop location');
    //   else if(!this.pickupTime)
    //   {
    //     alert('select a pick up time');
    //     console.log(this.startlocation,this.droplocation);
    //   }
    // }
  }
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
}
