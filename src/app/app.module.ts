import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastrModule } from "ngx-toastr";
import { ChartModule } from "primeng/chart";
import { TableModule } from "primeng/table";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IsSignedInGuard } from "./guard/isSignedGuard";
import { RoleGuard } from "./guard/role.guard";
import { AuthInterceptor } from "./helpers/auth.interceptor";
import { HomeComponent } from "./modules/Back-office/home/home.component";
import { ProfileComponent } from "./modules/Back-office/profile/profile.component";
import { CapteurChartComponent } from "./modules/Buisiness-Intelligence/capteur-chart/capteur-chart.component";
import { CapteurHistoryTableComponent } from "./modules/Buisiness-Intelligence/capteur-chart/capteur-history-table/capteur-history-table.component";
import { LineChartComponent } from "./modules/Buisiness-Intelligence/capteur-chart/line-chart/line-chart.component";
import { MatChipsAutocompleteComponent } from "./modules/Buisiness-Intelligence/capteur-chart/mat-chips-autocomplete/mat-chips-autocomplete.component";
import { MatDatePickerComponent } from "./modules/Buisiness-Intelligence/capteur-chart/mat-date-picker/mat-date-picker.component";
import { CapteurValueComponent } from "./modules/Buisiness-Intelligence/capteur-value/capteur-value.component";
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
    LineChartComponent,
    MatChipsAutocompleteComponent,
    MatDatePickerComponent,
    CapteurHistoryTableComponent,
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
    MatChipsModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    TableModule,
  ],
  providers: [
    RoleGuard,
    IsSignedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
