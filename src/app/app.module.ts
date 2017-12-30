import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [ 
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home',  component: HomeComponent}, 
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [   
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserModule.withServerTransition({ appId: 'universal-cli' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
