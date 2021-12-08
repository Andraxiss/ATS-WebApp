import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/enum/role.enum';
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
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {

  invalidField: string[] = [];
  constructor(
    private entrepriseService: EntrepriseService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  public currentUser: UserDto = {}
  subscription: Subscription = new Subscription;
  public entrepriseForm?: FormGroup;
  ngOnInit(): void {
    this.subscription = this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser)
      this.initForm();
    }, err => console.log(err))
  }

  isAdmin() {
    return this.currentUser.roles?.some(r => r.roleId === Role.ADMIN) ?? false;
  }

  initForm() {
    this.entrepriseForm = this.formBuilder.group({
      nom: [{ value: this.currentUser.entreprise?.nom, disabled: !this.isAdmin() }, Validators.required],
      siret: [{ value: this.currentUser.entreprise?.siret, disabled: !this.isAdmin() }, Validators.required],
      adresse: [{ value: this.currentUser.entreprise?.adresse, disabled: !this.isAdmin() }, [Validators.required]],
    })
  }

  submit() {
    if (this.entrepriseForm?.valid) {
      const formValue = this.entrepriseForm?.value;
      this.currentUser.entreprise!.nom = formValue['nom'];
      this.currentUser.entreprise!.siret = formValue['siret'];
      this.currentUser.entreprise!.adresse = formValue['adresse'];
      this.entrepriseService.updateEntreprise(this.currentUser.entreprise!);

    } else {
      let a = this.entrepriseForm!.controls;
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
