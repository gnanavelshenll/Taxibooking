import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { GoogleplaceDirective } from '../directive/googleplace-directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 public location : Object;
 public droplocation : Object;

  constructor(meta: Meta, title: Title) { 

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

  }

  ngOnInit() {
  }

  getAddressOnChange(event,LocationCtrl){
    console.log("event",event);

    console.log("location",LocationCtrl);
  }
 
}
