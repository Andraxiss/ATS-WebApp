import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../../models/LoginDto';
import { UserDto } from '../../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  public controllerName = environment.apiURL + '/users'
  constructor(private http: HttpClient) { }

  login(user: UserDto): Observable<LoginDto> {
    const endPoint = this.controllerName + '/authenticate';
    return this.http.post<LoginDto>(endPoint, user);
  }

}
