import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { faCog, faHdd, faHome, faSignOutAlt, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //declaration icons
  faHome = faHome;
  faAdmin = faUserShield;
  faHdd = faHdd;
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
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
  }



}
