import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../models/UserDto';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private $currentUser: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>({});
  private isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private toastr : ToastrService) {
    if(localStorage.getItem('currentUser')){
      const currentUser = JSON.parse(localStorage.getItem('currentUser')!) as UserDto;
      this.setCurrentUser(currentUser);
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return !jwtHelper.isTokenExpired(token);
    } else return false;
  }


  public logout() {
    localStorage.clear();
    this.isAuth$.next(false)
    this.toastr.info('Déconnexion réussie')
  }

  public setCurrentUser(user: UserDto) {
    this.$currentUser.next(user);
  }

  public getCurrentUser() {
    return this.$currentUser;
  }



}
