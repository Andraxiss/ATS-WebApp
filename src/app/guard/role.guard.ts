import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDto } from '../models/UserDto';
import { UserService } from '../services/user.service';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {
  }


  isUserInRoles(user: UserDto, roles: number[]): boolean {
    if (user) {
      if (!roles || roles.length === 0) {
        return true;
      }
      return user.roles!.some(r => roles.includes(r.roleId!));
    }
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles = next.data.roles;
    const user = this.userService.getCurrentUserStorage();
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    else if (this.isUserInRoles(user, roles)) {
      return true
    } else {
      this.router.navigate(['/'])
      return false;
    }
  }
}
