import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { EntrepriseDto } from 'src/app/models/EntrepriseDto';
import { RoleDto } from 'src/app/models/RoleDto';
import { UserDto } from 'src/app/models/UserDto';
import { UserApiService } from 'src/app/services/API/user-api.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
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
    private entrepriseService: EntrepriseService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  faPlus = faPlus;
  public entrepriseForm?: FormGroup;
  ngOnInit(): void {
    this.entrepriseService.getAllEntreprise().subscribe(u => {
      this.entreprises = u;
      console.log(this.entreprises);
    }, err => console.log(err))

    this.initForm();
  }

  updateUser(entreprise: EntrepriseDto) {
    this.entrepriseService.updateEntreprise(entreprise);
  }

  initForm() {
    this.entrepriseForm = this.formBuilder.group({
      nom: [this.newEntreprise.nom, Validators.required],
      siret: [this.newEntreprise.siret, Validators.required],
      adresse: [this.newEntreprise.adresse, [Validators.required]],
    })
  }

  resetForm() {
    this.entrepriseForm?.reset();
  }


  submit() {
    if (this.entrepriseForm?.valid) {
      const formValue = this.entrepriseForm?.value;
      this.newEntreprise.nom = formValue['nom'];
      this.newEntreprise.siret = formValue['siret'];
      this.newEntreprise.adresse = formValue['adresse'];
      this.entrepriseService.createEntreprise(this.newEntreprise);
      this.isModalDisplayed = false;
      this.resetForm();

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

  displayModal() {
    this.isModalDisplayed = !this.isModalDisplayed;
  }


}
