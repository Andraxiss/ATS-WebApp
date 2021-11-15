import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/models/UserDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }
  public currentUser: UserDto = {}
  subscription: Subscription = new Subscription;
  public userForm?: FormGroup;
  ngOnInit(): void {
    this.subscription = this.userService.getCurrentUser().subscribe(user => {
      console.log(user);
      this.currentUser = user;
      this.initForm();
    }, err => console.log(err))
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      prenom: [this.currentUser.prenom, Validators.required],
      nom: [this.currentUser.prenom, Validators.required],
    })
  }

  getUserName() {
    if (this.currentUser.prenom && this.currentUser.nom) {
      return this.currentUser.prenom + this.currentUser.nom;
    } else {
      return this.currentUser.email;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

}
