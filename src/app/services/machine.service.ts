import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { MachineDto } from '../models/MachineDto';
import { MachineApiService } from './API/machine-api.service';


@Injectable({
    providedIn: 'root'
})
export class MachineService {

    private $allMachines: BehaviorSubject<MachineDto[]> = new BehaviorSubject<MachineDto[]>([]);
    constructor(private toastr: ToastrService, private machineApiService: MachineApiService) {

    }

    public getAllMachines() {
        this.machineApiService.getAllMachines().subscribe(e => {
            this.$allMachines.next(e);
        })
        return this.$allMachines;
    }

    public createMachine(machine: MachineDto) {
        this.machineApiService.createMachine(machine).subscribe(e => {
            this.toastr.success('Modification enregistrée.', 'Entreprise créée !');
            this.getAllMachines();
        }, err => console.log(err))
    }




    public updateMachine(machine: MachineDto) {
        this.machineApiService.updateMachine(machine).subscribe(e => {
            this.toastr.success('Modification enregistrée.', 'Mise à jour réussie !');
        }, err => {
            console.log(err);
        })
    }

    public getMachineById(id: number) {
        return this.machineApiService.getMachineById(id)
    }


}
