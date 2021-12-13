import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/UserDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser: UserDto = {}
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(e => {
      this.currentUser = e;
    }, err => console.log(err))
  }

}
