import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IsSignedInGuard } from "./guard/isSignedGuard";
import { RoleGuard } from "./guard/role.guard";
import { AdministrationComponent } from "./modules/Back-office/administration/administration.component";
import { ListeEntreprisesComponent } from "./modules/Back-office/administration/liste-entreprises/liste-entreprises.component";
import { ListeMachinesComponent } from "./modules/Back-office/administration/liste-machines/liste-machines.component";
import { ListeUtilisateursComponent } from "./modules/Back-office/administration/liste-utilisateurs/liste-utilisateurs.component";
import { HomeComponent } from "./modules/Back-office/home/home.component";
import { ProfileComponent } from "./modules/Back-office/profile/profile.component";
import { CapteurChartComponent } from "./modules/Buisiness-Intelligence/capteur-chart/capteur-chart.component";
import { LastCapteurValueComponent } from "./modules/Buisiness-Intelligence/last-capteur-value/last-capteur-value.component";
import { LoginComponent } from "./modules/login/login.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent, canActivate: [RoleGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [RoleGuard] },
  {
    path: "admin", component: AdministrationComponent, canActivate: [RoleGuard],
    children: [
      { path: "utilisateurs", component: ListeUtilisateursComponent },
      { path: "entreprises", component: ListeEntreprisesComponent },
      { path: "machines", component: ListeMachinesComponent },
      { path: "", pathMatch: "full", redirectTo: "utilisateurs" },
    ]
  },
  { path: "login", canActivate: [IsSignedInGuard], component: LoginComponent },
  {
    path: "machine/:machineId/last-capteurs-value",
    canActivate: [RoleGuard],
    component: LastCapteurValueComponent,
  },
  {
    path: "machine/:machineId/:capteurId",
    canActivate: [RoleGuard],
    component: CapteurChartComponent,
  },
  {
    path: "machine/:machineId/capteur/:capteurId/history",
    canActivate: [RoleGuard],
    component: CapteurChartComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
