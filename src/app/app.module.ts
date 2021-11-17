import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./modules/login/login.component";
import { HomeComponent } from "./modules/Back-office/home/home.component";
import { HeaderComponent } from "./modules/header/header.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoleGuard } from "./guard/role.guard";
import { IsSignedInGuard } from "./guard/isSignedGuard";
import { AuthInterceptor } from "./helpers/auth.interceptor";
import { ProfileComponent } from "./modules/Back-office/profile/profile.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { CapteurValueComponent } from "./modules/Buisiness-Intelligence/capteur-value/capteur-value.component";
import { CapteurChartComponent } from './modules/Buisiness-Intelligence/capteur-chart/capteur-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    CapteurValueComponent,
    CapteurChartComponent,
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
    ToastrModule.forRoot(),
  ],
  providers: [
    RoleGuard,
    IsSignedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
