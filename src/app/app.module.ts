import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LocationTaxiModel } from './home/location.taxi.model';
import { AboutComponent } from './about/about.component';
import { GoogleplaceDirective } from './directive/googleplace-directive';
import { EqualValidator } from './header/password.match.directive';
import { HeaderService } from './header/header.service';
import { BookingComponent } from './booking/booking.component';
import { BookingService } from './booking/booking.service';
import { BookingModel } from './booking/booking.model';
import { HeaderModel } from './header/header.models';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    GoogleplaceDirective,
    EqualValidator,
    BookingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ang4-seo'}),
    HttpClientModule,  
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      libraries: ["places"]
    }),
  ],
  providers: [
    BookingService,
    HeaderService,
    BookingModel,
    LocationTaxiModel,
    HeaderModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
