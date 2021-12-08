import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/models/UserDto';
import { UserApiService } from 'src/app/services/API/user-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
    private userApiService: UserApiService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }
  public currentUser: UserDto = {}
  invalidField: string[] = [];
  public isVisitor: boolean = true;
  subscription: Subscription = new Subscription;
  public userForm?: FormGroup;
  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUserById(+id).subscribe(e => {
        this.currentUser = e;
        this.initForm();
      })
    }
    else {
      this.subscription = this.userService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
        this.isVisitor = false;
        this.initForm();
      }, err => console.log(err))
    }
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      prenom: [this.currentUser.prenom, Validators.required],
      nom: [this.currentUser.nom, Validators.required],
    })
  }

  getUserName() {
    if (this.currentUser.prenom && this.currentUser.nom) {
      return this.currentUser.prenom + ' ' + this.currentUser.nom;
    } else {
      return this.currentUser.email;
    }
  }

  submit() {
    if (this.userForm?.valid) {
      const formValue = this.userForm?.value;
      this.currentUser.prenom = formValue['prenom'];
      this.currentUser.nom = formValue['nom'];
      if (this.isVisitor) {
        this.userService.updateUser(this.currentUser)
      } else {
        this.userService.updateCurrentUser(this.currentUser)
      }
    } else {
      console.log(this.userForm?.controls);
      let a = this.userForm!.controls;
      for (let control in a) {
        if (a[control].invalid) {
          this.invalidField.push(control)
        }
      }
      this.toastr.error('Champ ' + this.invalidField[0] + ' non valide.', 'Formulaire incomplet')
      this.invalidField = [];
      return;
    }


  }


  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

}
