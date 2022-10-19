import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public UserService: UserService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit(): void {
    if (
      location.href === 'http://localhost:4200/login' &&
      localStorage.getItem('token') !== ''
    ) {
      this.UserService.getMe()
        .pipe(
          tap((data: any) => {
            this.UserService.getMe();
            this.router.navigate(['/user', data.userId]);
          })
        )
        .subscribe(() => {});
    }
  }
}
