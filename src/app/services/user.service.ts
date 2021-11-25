import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../models/UserDto';
import { UserApiService } from './API/user-api.service';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private $currentUser: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>({});
  private $allUsers: BehaviorSubject<UserDto[]> = new BehaviorSubject<UserDto[]>([]);
  private isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private toastr: ToastrService, private userApiService: UserApiService) {
    if (localStorage.getItem('currentUser')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')!) as UserDto;
      const id = Number(currentUser.userId!);
      console.log(currentUser);
      this.userApiService.getUserById(id).subscribe(user => {
        this.setCurrentUser(user);
      }, err => console.log(err))
    }
  }

  public getAllUsers() {
    this.userApiService.getAllUsers().subscribe(u => {
      this.$allUsers.next(u);
    })
    return this.$allUsers;
  }

  public createUser(user: UserDto) {
    this.userApiService.createUser(user).subscribe(e => {
      this.toastr.success('Modification enregistrée.', 'Utilisateur créé !');
      this.getAllUsers();
    }, err => console.log(err))
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return !jwtHelper.isTokenExpired(token);
    } else return false;
  }

  public updateCurrentUser(user: UserDto) {
    this.userApiService.updateUser(user).subscribe(e => {
      this.toastr.success('Modification enregistrée.', 'Mise à jour réussie !');
      this.setCurrentUser(e);
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(e))
    }, err => {
      console.log(err);
    })
  }

  public updateUser(user: UserDto) {
    console.log(user);
    this.userApiService.updateUser(user).subscribe(e => {
      this.toastr.success('Modification enregistrée.', 'Mise à jour réussie !');
    }, err => {
      console.log(err);
    })
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
