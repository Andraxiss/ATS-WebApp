import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { RoleDto } from '../models/RoleDto';
import { UserDto } from '../models/UserDto';
import { RoleApiService } from './API/role-api.service';
import { UserApiService } from './API/user-api.service';

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private $roles: BehaviorSubject<RoleDto[]> = new BehaviorSubject<RoleDto[]>([]);
    constructor(private roleApiService: RoleApiService) {
        this.roleApiService.getAllRoles().subscribe((e) => {
            this.setRoles(e);
        }, err => console.log(err))

    }


    public getRoles() {
        return this.$roles;
    }

    public setRoles(roles: RoleDto[]) {
        return this.$roles.next(roles);
    }




}
