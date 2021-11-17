import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IsSignedInGuard } from "./guard/isSignedGuard";
import { RoleGuard } from "./guard/role.guard";
import { AdministrationComponent } from "./modules/Back-office/administration/administration.component";
import { HomeComponent } from "./modules/Back-office/home/home.component";
import { ProfileComponent } from "./modules/Back-office/profile/profile.component";
import { CapteurValueComponent } from "./modules/Buisiness-Intelligence/capteur-value/capteur-value.component";
import { LoginComponent } from "./modules/login/login.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent, canActivate: [RoleGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [RoleGuard] },
  { path: "admin", component: AdministrationComponent, canActivate: [RoleGuard] },
  { path: "login", canActivate: [IsSignedInGuard], component: LoginComponent },
  {
    path: "capteurs-value",
    canActivate: [RoleGuard],
    component: CapteurValueComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
