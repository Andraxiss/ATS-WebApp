import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { EntrepriseDto } from 'src/app/models/EntrepriseDto';
import { MachineDto } from 'src/app/models/MachineDto';
import { RoleDto } from 'src/app/models/RoleDto';
import { UserDto } from 'src/app/models/UserDto';
import { UserApiService } from 'src/app/services/API/user-api.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { MachineService } from 'src/app/services/machine.service';
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
  public newUser: UserDto = {};
  invalidField: string[] = [];
  public isModalDisplayed: boolean = false;
  constructor(private userApiService: UserApiService,
    private roleService: RoleService,
    private userService: UserService,
    private entrepriseService: EntrepriseService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  faPlus = faPlus;
  public userForm?: FormGroup;
  public entreprises: EntrepriseDto[] = []
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(u => {
      this.users = u;
    }, err => console.log(err))

    this.roleService.getRoles().subscribe(r => {
      this.roles = r;
    }, err => console.log(err))

    this.entrepriseService.getAllEntreprise().subscribe(e => {
      this.entreprises = e;
    }, err => console.log(err))




    this.initForm();

  }

  updateUser(user: UserDto) {
    //console.log(user);
    this.userService.updateUser(user);
  }

  updateUserEntreprise(user: UserDto, event: any) {
    let entrepriseId = event.value;
    user.entreprise = this.entreprises.find(e => e.entrepriseId === entrepriseId);
    this.updateUser(user);
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      prenom: [this.newUser.prenom, Validators.required],
      nom: [this.newUser.nom, Validators.required],
      email: [this.newUser.nom, [Validators.required, Validators.email]],
      password: [this.newUser.nom, Validators.required],
    })
  }

  resetForm() {
    this.userForm?.reset();
  }


  submit() {
    if (this.userForm?.valid) {
      const formValue = this.userForm?.value;
      this.newUser.prenom = formValue['prenom'];
      this.newUser.nom = formValue['nom'];
      this.newUser.email = formValue['email'];
      this.newUser.password_hash = formValue['password'];
      this.userService.createUser(this.newUser);
      this.isModalDisplayed = false;
      this.resetForm();

    } else {
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

  displayModal() {
    this.isModalDisplayed = !this.isModalDisplayed;
  }

}
