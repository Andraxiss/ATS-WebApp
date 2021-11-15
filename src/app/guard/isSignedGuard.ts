
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class IsSignedInGuard implements CanActivate {
    constructor(public userService: UserService, public router: Router) {
    }
    canActivate(): boolean {
      if (this.userService.isAuthenticated()) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
}