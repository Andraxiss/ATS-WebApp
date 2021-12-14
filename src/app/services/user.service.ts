import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { UserDto } from "../models/UserDto";
import { UserApiService } from "./API/user-api.service";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: "root",
})
export class UserService {
  private $currentUser: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>(
    {}
  );
  private $allUsers: BehaviorSubject<UserDto[]> = new BehaviorSubject<
    UserDto[]
  >([]);
  private isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private toastr: ToastrService,
    private userApiService: UserApiService
  ) {
    this.initCurrentUser();
  }

  public getAllUsers() {
    this.userApiService.getAllUsers().subscribe((u) => {
      u.sort((elt1, elt2) => elt1.nom!.localeCompare(elt2.nom!));
      this.$allUsers.next(u);
    });
    return this.$allUsers;
  }

  public initCurrentUser() {
    if (localStorage.getItem("currentUser")) {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser")!
      ) as UserDto;
      const id = Number(currentUser.userId!);
      this.userApiService.getUserById(id).subscribe(
        (user) => {
          this.setCurrentUser(user);
        },
        (err) => console.log(err)
      );
    }
  }

  public createUser(user: UserDto) {
    if (this.isUserExisting(user)) {
      this.toastr.error("Un utilisateur existe déjà avec cette adresse mail");
    } else {
      this.userApiService.createUser(user).subscribe(
        (e) => {
          this.toastr.success(
            "Modification enregistrée.",
            "Utilisateur créé !"
          );
          this.getAllUsers();
        },
        (err) => console.log(err)
      );
    }
  }

  public isUserExisting(user: UserDto) {
    var flag = false;
    const allUsers = this.$allUsers.getValue().forEach((value) => {
      if (value.email == user.email) {
        flag = true;
      }
    });
    return flag;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return !jwtHelper.isTokenExpired(token);
    } else return false;
  }

  public updateCurrentUser(user: UserDto) {
    this.userApiService.updateUser(user).subscribe(
      (e) => {
        this.toastr.success(
          "Modification enregistrée.",
          "Mise à jour réussie !"
        );
        this.setCurrentUser(e);
        localStorage.removeItem("currentUser");
        localStorage.setItem("currentUser", JSON.stringify(e));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public updateUser(user: UserDto) {
    this.userApiService.updateUser(user).subscribe(
      (e) => {
        if (e.userId === this.$currentUser.getValue().userId) {
          this.initCurrentUser();
        }
        const allUsers = this.$allUsers
          .getValue()
          .filter((e) => e.userId !== user.userId);
        this.$allUsers.next(
          [...allUsers, e].sort((a, b) => a.nom!.localeCompare(b.nom!))
        );
        this.toastr.success(
          "Modification enregistrée.",
          "Mise à jour réussie !"
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getCurrentUserStorage() {
    return JSON.parse(localStorage.getItem("currentUser")!) as UserDto;
  }

  public logout() {
    localStorage.clear();
    this.isAuth$.next(false);
    this.toastr.info("Déconnexion réussie");
  }

  public setCurrentUser(user: UserDto) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.$currentUser.next(user);
  }

  public getCurrentUser() {
    this.initCurrentUser();
    return this.$currentUser;
  }

  public getUserById(id: number) {
    return this.userApiService.getUserById(id);
  }
}
