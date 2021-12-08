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
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { TableModule } from "primeng/table";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IsSignedInGuard } from "./guard/isSignedGuard";
import { RoleGuard } from "./guard/role.guard";
import { AuthInterceptor } from "./helpers/auth.interceptor";
import { AdministrationComponent } from "./modules/Back-office/administration/administration.component";
import { ListeEntreprisesComponent } from "./modules/Back-office/administration/liste-entreprises/liste-entreprises.component";
import { ListeMachinesComponent } from "./modules/Back-office/administration/liste-machines/liste-machines.component";
import { ListeUtilisateursComponent } from "./modules/Back-office/administration/liste-utilisateurs/liste-utilisateurs.component";
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
import { MachinesComponent } from './modules/Back-office/machines/machines.component';
import { EntrepriseComponent } from './modules/Back-office/entreprise/entreprise.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    CapteurChartComponent,
    ProfileComponent,
    AdministrationComponent,
    CapteurValueComponent,
    CapteurChartComponent,
    LineChartComponent,
    MatChipsAutocompleteComponent,
    MatDatePickerComponent,
    ListeUtilisateursComponent,
    ListeEntreprisesComponent,
    ListeMachinesComponent,
    CapteurHistoryTableComponent,
    MachinesComponent,
    EntrepriseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartModule,
    MatChipsModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MultiSelectModule,
    DropdownModule,
    DialogModule,
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
