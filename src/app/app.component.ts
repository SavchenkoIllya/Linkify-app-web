import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public UserService: UserService) {}
  title = 'Linkify';

  ngOnInit(): void {
    if (location.href === 'http://localhost:4200/') {
      this.router.navigate(['/login']);
    }
  }
}
