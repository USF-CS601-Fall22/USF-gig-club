import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './users/pages/login/login.component';
import { SignupComponent } from './users/pages/signup/signup.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./classifieds/classifieds.module').then(m => m.ClassifiedsModule) },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
