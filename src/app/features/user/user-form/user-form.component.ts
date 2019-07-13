import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UserState } from '../+state/user.state';
import { AddUser, UpdateUser } from './../+state/user.action';
import { Observable } from 'rxjs';
import { User } from '../../../core/interfaces/user.model';
import { UserService } from '../../../core/services/user.service';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Select(UserState.getSelectedUser) selectedUser: Observable<User>;
  public userForm: FormGroup;
  public editUser = false;
  public isDisable = false;
  public isAction: string;

  constructor(
      private fb: FormBuilder,
      private store: Store,
      private route: ActivatedRoute,
      private userService: UserService,
      private data: DataService,
      private router: Router) {
      this.createForm();
  }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.isAction = message);
      localStorage.setItem('action', this.isAction);
      console.log(this.isAction);
      const id = +this.route.snapshot.paramMap.get('id');
      console.log(id);
      if (id > 0) {
      this.isDisable = true;
      this.getUser(id);
      this.selectedUser.subscribe(user => {
          if (user) {
              this.userForm.patchValue({
                  id: user.id,
                  userId: user.userId,
                  name: user.name
              });
              this.editUser = true;
          } else {
              this.editUser = false;
          }
      });
      }
  }

  getUser(id: number) {
      this.userService.selectedUsers(id).subscribe(selectedUser => {
          this.userForm.patchValue({
              id: selectedUser.id,
              userId: selectedUser.userId,
              name: selectedUser.name
          });
      });
  }

  createForm() {
      this.userForm = this.fb.group({
          id: [''],
          userId: ['', Validators.required],
          name: ['', Validators.required]
      });
  }

  onSubmit() {
      if (this.editUser) {
          this.store.dispatch(new UpdateUser(this.userForm.value, this.userForm.value.id)).subscribe(() => {
              this.clearForm();
              this.router.navigate(['user']);
          });
      } else if (this.userForm.value.userId != null) {
          console.log(this.userForm.value.userId);
          this.store.dispatch(new AddUser(this.userForm.value)).subscribe(() => {
              this.clearForm();
              this.router.navigate(['user']);
          });
      }
  }

  clearForm() {
      this.userForm.reset();
  }

}
