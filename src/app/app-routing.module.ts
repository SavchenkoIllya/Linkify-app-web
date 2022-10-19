import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinkComponent } from './pages/link/link.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserComponent } from './pages/user/user.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user', children: [{ path: ':id', component: UserComponent }] },
  { path: 'category', children: [{ path: ':id', component: LinkComponent }] },
  { path: 'allusers', component: AllUsersComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
