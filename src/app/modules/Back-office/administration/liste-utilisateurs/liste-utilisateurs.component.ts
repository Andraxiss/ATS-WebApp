import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { RoleDto } from 'src/app/models/RoleDto';
import { UserDto } from 'src/app/models/UserDto';
import { UserApiService } from 'src/app/services/API/user-api.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.scss']
})
export class ListeUtilisateursComponent implements OnInit {
  public users: UserDto[] = [];
  public roles: RoleDto[] = [];
  constructor(private userApiService: UserApiService, private roleService: RoleService, private userService: UserService) {
  }

  faPlus = faPlus;

  ngOnInit(): void {
    this.userApiService.getAllUsers().subscribe(u => {
      this.users = u;
    }, err => console.log(err))

    this.roleService.getRoles().subscribe(r => {
      this.roles = r;
    }, err => console.log(err))

  }

  updateUser(user: UserDto) {
    this.userService.updateUser(user);
  }

}
