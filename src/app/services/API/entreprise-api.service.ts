import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrepriseDto } from 'src/app/models/EntrepriseDto';
import { environment } from 'src/environments/environment';
import { UserDto } from '../../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseApiService {

  public controllerName = environment.apiURL + '/entreprises'
  constructor(private http: HttpClient) { }

  updateEntreprise(entreprise: EntrepriseDto): Observable<EntrepriseDto> {
    const endPoint = this.controllerName;
    return this.http.put<EntrepriseDto>(endPoint, entreprise);
  }
  createEntreprise(entreprise : EntrepriseDto): Observable<EntrepriseDto> {
    const endPoint = this.controllerName+ '/create';
    return this.http.post<EntrepriseDto>(endPoint, entreprise);
  }
  getEntrepriseById(id: number): Observable<EntrepriseDto> {
    const endPoint = this.controllerName + `/${id}`;
    return this.http.get<EntrepriseDto>(endPoint);
  }
  getAllEntreprises(): Observable<EntrepriseDto[]> {
    const endPoint = this.controllerName + '/all';
    return this.http.get<EntrepriseDto[]>(endPoint);
  }


  

}
