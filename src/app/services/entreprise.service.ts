import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { EntrepriseDto } from '../models/EntrepriseDto';
import { UserDto } from '../models/UserDto';
import { EntrepriseApiService } from './API/entreprise-api.service';


@Injectable({
    providedIn: 'root'
})
export class EntrepriseService {

    private $allEntreprise: BehaviorSubject<UserDto[]> = new BehaviorSubject<UserDto[]>([]);
    constructor(private toastr: ToastrService, private entrepriseApiService: EntrepriseApiService) {

    }

    public getAllEntreprise() {
        this.entrepriseApiService.getAllEntreprises().subscribe(e => {
            this.$allEntreprise.next(e);
        })
        return this.$allEntreprise;
    }

    public createEntreprise(entreprise: EntrepriseDto) {
        this.entrepriseApiService.createEntreprise(entreprise).subscribe(e => {
            this.toastr.success('Modification enregistrée.', 'Entreprise créée !');
            this.getAllEntreprise();
        }, err => console.log(err))
    }




    public updateEntreprise(entreprise: EntrepriseDto) {
        this.entrepriseApiService.updateEntreprise(entreprise).subscribe(e => {
            this.toastr.success('Modification enregistrée.', 'Mise à jour réussie !');
        }, err => {
            console.log(err);
        })
    }

    public getEntrepriseById(id: number) {
        return this.entrepriseApiService.getEntrepriseById(id)
    }


}
