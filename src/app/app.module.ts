import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/Back-office/home/home.component';
import { HeaderComponent } from './modules/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleGuard } from './guard/role.guard';
import { IsSignedInGuard } from './guard/isSignedGuard';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CapteurValueComponent } from './modules/Buisiness-Intelligence/capteur-value/capteur-value.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileComponent } from './modules/Back-office/profile/profile.component';
import { AdministrationComponent } from './modules/Back-office/administration/administration.component';
import {DropdownModule} from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    CapteurValueComponent,
    ProfileComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    DropdownModule,
    AccordionModule,
    ToastrModule.forRoot()
  ],
  exports:[
    NgSelectModule,
    DropdownModule
  ],
  providers: [RoleGuard, IsSignedInGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
