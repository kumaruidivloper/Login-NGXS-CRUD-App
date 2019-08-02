import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UserState } from '../+state/user.state';
import { AddUser, UpdateUser } from './../+state/user.action';
import { Observable } from 'rxjs';
import { User } from '../../../core/interfaces/user.model';
import { UserService } from '../../../core/services/user.service';
import { DataService } from '../../../core/services/data.service';
import { FormCanDeactivate } from '../../../core/guards/form-can-deactivate';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteUser, GetUsers, SetSelectedUser } from '../../user/+state/user.action';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent  extends FormCanDeactivate  implements OnInit   {
  form: NgForm;
  @Select(UserState.getSelectedUser) selectedUser: Observable<User>;
  public userForm: FormGroup;
  public modalRef: BsModalRef;
  public editUser = false;
  public isDisable = false;
  public isAction: string;
  public message: string;
  public selectedId: any;
  public selectedUserr: any;

  constructor(
      private fb: FormBuilder,
      private store: Store,
      private route: ActivatedRoute,
      private userService: UserService,
      private data: DataService,
      private modalService: BsModalService,
      private router: Router) {
      super();
      this.createForm();
  }

  ngOnInit() {
      this.isAction = localStorage.getItem('action');
    //   this.data.currentMessage.subscribe(message => this.isAction = message);
    //   localStorage.setItem('action', this.isAction);
    //   console.log(this.isAction);
      const id = +this.route.snapshot.paramMap.get('id');
      console.log(id);
      this.selectedId = id;
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

  openModal(template: TemplateRef<any>, user: User, userId) {
    console.log(userId);
    this.selectedUserr = userId;
    this.selectedId = user;
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  getUser(id: number) {
      this.userService.selectedUsers(id).subscribe(selectedUser => {
        console.log(selectedUser);
        const selectedUserr = JSON.parse(JSON.stringify(selectedUser));
        console.log(selectedUserr);
        this.userForm.patchValue({
              id: selectedUserr.id,
              userId: selectedUserr.userId,
              name: selectedUserr.name
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

  confirm(id: number): void {
    console.log(id);
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.store.dispatch(new DeleteUser(id));
    this.router.navigate(['user']);
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  clearForm() {
      this.userForm.reset();
  }

}
