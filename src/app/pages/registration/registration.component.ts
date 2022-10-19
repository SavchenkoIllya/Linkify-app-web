import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(public UserService: UserService, private router: Router) {}
  registrationForm = new FormGroup(
    {
      username: new FormControl(),
      password: new FormControl(),
      passwordConfirm: new FormControl(),
      avatar: new FormControl(),
      fileSource: new FormControl()
    },
    { validators: customValidator }
  );

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registrationForm.patchValue({
        fileSource: file
      });
    }
  }

  ngOnInit(): void {
    if (
      location.href === 'http://localhost:4200/registration' &&
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

function customValidator(smt: AbstractControl) {
  return smt.get('password') === smt.get('passwordConfirm')
    ? null
    : { mismatch: true };
}
