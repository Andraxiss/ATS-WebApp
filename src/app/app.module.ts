import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastrModule } from "ngx-toastr";
import { ChartModule } from "primeng/chart";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IsSignedInGuard } from "./guard/isSignedGuard";
import { RoleGuard } from "./guard/role.guard";
import { AuthInterceptor } from "./helpers/auth.interceptor";
import { HomeComponent } from "./modules/Back-office/home/home.component";
import { ProfileComponent } from "./modules/Back-office/profile/profile.component";
import { CapteurChartComponent } from "./modules/Buisiness-Intelligence/capteur-chart/capteur-chart.component";
import { CapteurValueComponent } from "./modules/Buisiness-Intelligence/capteur-value/capteur-value.component";
import { MatTestComponent } from "./modules/Buisiness-Intelligence/mat-test/mat-test.component";
import { HeaderComponent } from "./modules/header/header.component";
import { LoginComponent } from "./modules/login/login.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    CapteurValueComponent,
    CapteurChartComponent,
    MatTestComponent,
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
    ChartModule,
    ToastrModule.forRoot(),
    MatSliderModule,
  ],
  providers: [
    RoleGuard,
    IsSignedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
