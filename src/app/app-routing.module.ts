import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Home'
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'login'
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      breadcrumb: 'Register'
    }
  },
  {
    path: 'dashboard',
    data: {
      breadcrumb: 'Dashboard'
    },
    loadChildren: './features/user/user.module#UserModule',
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
