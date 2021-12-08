import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { MachineDto } from 'src/app/models/MachineDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }
  machines: MachineDto[] = []
  faServer = faServer;
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(e => {
      this.machines = e.machines ?? [];
    })
  }

  navigate(id: number) {
    this.router.navigate(['machine/' + id + '/capteurs-value/last-value'])
  }

}
