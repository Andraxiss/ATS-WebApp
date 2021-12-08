import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DropdownModule } from 'primeng/dropdown';
import { RoleDto } from 'src/app/models/RoleDto';
import { UserDto } from 'src/app/models/UserDto';
import { RoleApiService } from 'src/app/services/API/role-api.service';
import { UserApiService } from 'src/app/services/API/user-api.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';


interface adminRoute {
  name?: string;
}

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  public routes: adminRoute[] = [{ name: 'utilisateurs' }, { name: 'entreprises' }, { name: 'machines' }];
  public activeRoute: adminRoute = {}
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.initialCheckRoute();
  }

  navigate(route: string) {
    this.router.navigate(['/admin/' + route])
  }

  initialCheckRoute() {
    const url = this.router.url.split('/').find((elt, i, arr) => elt === arr[arr.length - 1]);
    this.activeRoute = (this.routes.find(e => e.name?.includes(url!))) ?? this.routes[0];
  }



}
