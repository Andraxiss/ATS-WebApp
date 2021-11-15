import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/models/UserDto';
import { AuthApiService } from 'src/app/services/auth-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public invalidField: string[] = [];
  public user: UserDto = {};
  public loginForm?: FormGroup
  constructor(private authApiService: AuthApiService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }


  submit() {
    if (this.loginForm?.valid) {
      const formValue = this.loginForm?.value;
      this.user.email = formValue['email'];
      this.user.password_hash = formValue['password'];
      this.authApiService.login(this.user).subscribe(e => {
        localStorage.setItem('token', e.token)
        localStorage.setItem('currentUser', JSON.stringify(e.user));
        this.userService.setCurrentUser(e.user);
        this.toastr.success('Authentification réussie !', 'Bienvenue')
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      })
    } else {
      console.log(this.loginForm?.controls);
      let a = this.loginForm!.controls;
      for (let control in a) {
        if (a[control].invalid) {
          this.invalidField.push(control)
        }
      }
      this.toastr.error('Champ ' + this.invalidField[0] + ' non valide.', 'Formulaire incomplet')
      this.invalidField =[];
      return;
    }


  }

}
