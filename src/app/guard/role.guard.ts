import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDto } from '../models/UserDto';
import { UserService } from '../services/user.service';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {
  }
  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
