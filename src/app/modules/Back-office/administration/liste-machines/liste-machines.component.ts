import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MachineDto } from 'src/app/models/MachineDto';
import { RoleDto } from 'src/app/models/RoleDto';
import { UserApiService } from 'src/app/services/API/user-api.service';
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
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  faPlus = faPlus;
  public machineForm?: FormGroup;
  ngOnInit(): void {
    this.machineService.getAllMachines().subscribe(u => {
      this.machines = u;
      console.log(this.machines);
    }, err => console.log(err))

    this.initForm();
  }

  updateUser(machine: MachineDto) {
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
