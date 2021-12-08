import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { EntrepriseDto } from 'src/app/models/EntrepriseDto';
import { MachineDto } from 'src/app/models/MachineDto';
import { RoleDto } from 'src/app/models/RoleDto';
import { UserApiService } from 'src/app/services/API/user-api.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { MachineService } from 'src/app/services/machine.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-liste-machines',
  templateUrl: './liste-machines.component.html',
  styleUrls: ['./liste-machines.component.scss']
})
export class ListeMachinesComponent implements OnInit {

  public machines: MachineDto[] = [];
  public newMachine: MachineDto = {};
  invalidField: string[] = [];
  public isModalDisplayed: boolean = false;
  constructor(
    private machineService: MachineService,
    private entrepriseService: EntrepriseService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  faPlus = faPlus;
  public machineForm?: FormGroup;
  public entreprises?: EntrepriseDto[] = [];
  ngOnInit(): void {
    this.machineService.getAllMachines().subscribe(u => {
      this.machines = u;
      console.log(this.machines);
    }, err => console.log(err))

    this.entrepriseService.getAllEntreprise().subscribe(e => {
      this.entreprises = e;
    }, err => console.log(err))

    this.initForm();
  }

  updateMachine(machine: MachineDto) {
    this.machineService.updateMachine(machine);
  }

  initForm() {
    this.machineForm = this.formBuilder.group({
      nom: [this.newMachine.nom, Validators.required],
    })
  }

  resetForm() {
    this.machineForm?.reset();
  }


  submit() {
    if (this.machineForm?.valid) {
      const formValue = this.machineForm?.value;
      this.newMachine.nom = formValue['nom'];
      this.machineService.createMachine(this.newMachine);
      this.isModalDisplayed = false;
      this.resetForm();

    } else {
      let a = this.machineForm!.controls;
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
