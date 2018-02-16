import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService, CookieBackendService } from 'ngx-cookie';
import { AuthService } from './services/auth.service';

@NgModule({
imports: [
    ServerModule,
    AppModule
],
bootstrap: [AppComponent],
providers: [{ provide: CookieService, useClass: CookieBackendService },AuthService]
})
export class AppServerModule { }