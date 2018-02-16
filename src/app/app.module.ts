// NPM packages
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule,JsonpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CookieModule } from 'ngx-cookie';

//App Modules, Components and Services
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GoogleplaceDirective } from './directive/googleplace-directive';
import { EqualValidator } from './header/password.match.directive';
import { BookingComponent } from './booking/booking.component';
import { AuthService } from './services/auth.service';


//Module Invocation
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    GoogleplaceDirective,
    EqualValidator,
    BookingComponent,
  ],
  imports: [ //Package Injection
    BrowserModule.withServerTransition({appId: 'ang4-seo'}),
    HttpClientModule,  
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      libraries: ["places"]
    }),
    CookieModule.forRoot(),
    HttpModule,
    JsonpModule
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
