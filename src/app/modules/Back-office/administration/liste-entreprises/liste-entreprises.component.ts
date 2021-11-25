import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { EntrepriseDto } from 'src/app/models/EntrepriseDto';
import { RoleDto } from 'src/app/models/RoleDto';
import { UserDto } from 'src/app/models/UserDto';
import { UserApiService } from 'src/app/services/API/user-api.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liste-entreprises',
  templateUrl: './liste-entreprises.component.html',
  styleUrls: ['./liste-entreprises.component.scss']
})
export class ListeEntreprisesComponent implements OnInit {

  public entreprises: EntrepriseDto[] = [];
  public roles: RoleDto[] = [];
  public newEntreprise: EntrepriseDto = {};
  invalidField: string[] = [];
  public isModalDisplayed: boolean = false;
  constructor(private userApiService: UserApiService,
    private roleService: RoleService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  faPlus = faPlus;
  public userForm?: FormGroup;
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(u => {
      this.entreprises = u;
    }, err => console.log(err))

    this.roleService.getRoles().subscribe(r => {
      this.roles = r;
    }, err => console.log(err))

    this.initForm();

  }

  updateUser(user: UserDto) {
    this.userService.updateUser(user);
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      nom: [this.newEntreprise.nom, Validators.required],
      siret: [this.newEntreprise.siret, Validators.required],
      adresse: [this.newEntreprise.adresse, [Validators.required]],
    })
  }

  resetForm() {
    this.userForm?.reset();
  }


  submit() {
    if (this.userForm?.valid) {
      const formValue = this.userForm?.value;
      this.newEntreprise.nom = formValue['nom'];
      this.newEntreprise.siret = formValue['siret'];
      this.newEntreprise.adresse = formValue['adresse'];
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
