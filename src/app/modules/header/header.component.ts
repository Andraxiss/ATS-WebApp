import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { faBuilding, faCog, faHdd, faHome, faSignOutAlt, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Role } from 'src/app/enum/role.enum';
import { UserDto } from 'src/app/models/UserDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //declaration icons
  currentUser: UserDto = {}
  faHome = faHome;
  faAdmin = faUserShield;
  faHdd = faHdd;
  faBuilding = faBuilding;
  faSignOut = faSignOutAlt;
  faUser = faUser;
  currentRoute = 'home';
  event$;
  constructor(private userService: UserService, private router: Router) {
    this.event$
      = this.router.events
        .subscribe(
          (event: NavigationEvent) => {
            if (event instanceof NavigationStart) {
              this.currentRoute = event.url.replace('/', '');
            }
          });
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(e => {
      this.currentUser = e;
    })
  }

  isAdmin() {
    return this.currentUser.roles?.some(r => r.roleId === Role.ADMIN)
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
  }



}
