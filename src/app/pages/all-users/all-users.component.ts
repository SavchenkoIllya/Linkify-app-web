import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  constructor(public UserService: UserService, public router: Router) {}
  allUsers: any;
  ngOnInit(): void {
    this.UserService.getMe().subscribe();
    this.UserService.getAll().subscribe((data) => {
      this.allUsers = data;
    });
  }
}
