import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleDto } from 'src/app/models/RoleDto';
import { UserDto } from 'src/app/models/UserDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {

  public controllerName = environment.apiURL + '/roles'
  constructor(private http: HttpClient) { }


  getAllRoles(): Observable<RoleDto[]> {
    const endPoint = this.controllerName + '/all';
    return this.http.get<RoleDto[]>(endPoint);
  }
}
