import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { PreventUnsavedChangesGuard } from '../../core/guards/prevent-unsaved-changes-gauard';
import { ConfirmLeaveComponent } from '../../core/components/confirm-leave/confirm-leave.component';
import { BreadcrumbsModule } from '../../core/components/breadcrumbs/breadcrumbs.module';

const routes: Routes = [
  { path: '', component: UserListComponent,
  data: {
    breadcrumb: 'User List'
  }
  },
  { path: 'details/:id', 
  component: UserFormComponent,
  data: {
    breadcrumb: 'User Details'
  }
  },
  { path: 'edit/:id', component: UserFormComponent,
  canDeactivate: [ PreventUnsavedChangesGuard ],
  data: {
    breadcrumb: 'Update User'
  }, },
  { path: 'adduser', component: UserFormComponent,
  data: {
    breadcrumb: 'Create User'
  }, }
];

@NgModule({
  declarations: [
    UserFormComponent,
    UserDetailComponent,
    UserComponent,
    UserListComponent,
    ConfirmLeaveComponent
  ],
  imports: [
    BreadcrumbsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot(),
    BreadcrumbsModule
  ],
  providers: [
    PreventUnsavedChangesGuard
  ],
  entryComponents: [
    ConfirmLeaveComponent,
  ],
})
export class UserModule { }
