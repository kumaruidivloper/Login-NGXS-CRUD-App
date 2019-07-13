import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id/details', component: UserFormComponent },
  { path: ':id/edit', component: UserFormComponent },
  { path: 'adduser', component: UserFormComponent }
];

@NgModule({
  declarations: [
    UserFormComponent,
    UserDetailComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot()
  ]
})
export class UserModule { }
