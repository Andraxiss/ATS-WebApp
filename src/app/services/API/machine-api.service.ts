import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntrepriseDto } from 'src/app/models/EntrepriseDto';
import { MachineDto } from 'src/app/models/MachineDto';
import { environment } from 'src/environments/environment';
import { UserDto } from '../../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class MachineApiService {

  public controllerName = environment.apiURL + '/bo/machines'
  constructor(private http: HttpClient) { }

  updateMachine(machine: MachineDto): Observable<MachineDto> {
    const endPoint = this.controllerName;
    return this.http.put<MachineDto>(endPoint, machine);
  }
  createMachine(machine: MachineDto): Observable<MachineDto> {
    const endPoint = this.controllerName + '/create';
    return this.http.post<MachineDto>(endPoint, machine);
  }
  getMachineById(id: number): Observable<MachineDto> {
    const endPoint = this.controllerName + `/${id}`;
    return this.http.get<MachineDto>(endPoint);
  }
  getAllMachines(): Observable<MachineDto[]> {
    const endPoint = this.controllerName + '/all';
    return this.http.get<MachineDto[]>(endPoint);
  }


}
