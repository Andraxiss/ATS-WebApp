import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../../models/LoginDto';
import { UserDto } from '../../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  public controllerName = environment.apiURL + '/users'
  constructor(private http: HttpClient) { }

  updateUser(user: UserDto): Observable<UserDto> {
    const endPoint = this.controllerName;
    return this.http.put<UserDto>(endPoint, user);
  }
  createUser(user: UserDto): Observable<UserDto> {
    const endPoint = this.controllerName+ '/create';
    return this.http.post<UserDto>(endPoint, user);
  }
  getUserById(id: number): Observable<UserDto> {
    const endPoint = this.controllerName + `/${id}`;
    return this.http.get<UserDto>(endPoint);
  }

  getAllUsers(): Observable<UserDto[]> {
    const endPoint = this.controllerName + '/all';
    return this.http.get<UserDto[]>(endPoint);
  }


  

}
