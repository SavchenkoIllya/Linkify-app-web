import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  registrationMessage: any;
  greenText: boolean = false;
  user: any;
  currentUser: any;

  getMe() {
    return this.http
      .get('http://localhost:3000/api/auth/me', {
        headers: { autorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .pipe(
        tap((data) => {
          this.currentUser = data;
        })
      );
  }

  getAll() {
    return this.http.get('http://localhost:3000/api/auth/users/all');
  }

  getById() {
    let fullLocation = location.href
      .toString()
      .replace(location.origin.toString().concat('/user/'), '');
    return this.http
      .get(`http://localhost:3000/api/auth/${fullLocation}`, {
        headers: { autorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .pipe(
        tap((data: any) => {
          this.user = data;
        })
      );
  }

  logout() {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    window.location.href = '/';
  }

  registrate(formData: FormGroup) {
    const formFile = new FormData();
    formFile.append('file', formData.get('fileSource')?.value);
    formFile.append('username', formData.value.username);
    formFile.append('password', formData.value.password);

    return this.http
      .post('http://localhost:3000/api/auth/register', formFile)
      .pipe(
        tap((data: any) => {
          this.registrationMessage = data.message;
          if (this.registrationMessage?.message !== 'User saved successfully') {
            this.greenText = false;
          } else {
            this.greenText = true;
          }
          localStorage.setItem('token', data.token);
          formData.reset();
          if (data.newUserId) {
            setTimeout(() => {
              this.router.navigate(['/user', data.newUserId]);
            }, 1500);
          }
        })
      )
      .subscribe(() => {});
  }

  login(formData: FormGroup) {
    let user = {
      username: formData.value.username,
      password: formData.value.password,
    };
    return this.http
      .post('http://localhost:3000/api/auth/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/user', data.userId]);
          formData.reset();
        })
      )
      .subscribe(() => {});
  }
}
