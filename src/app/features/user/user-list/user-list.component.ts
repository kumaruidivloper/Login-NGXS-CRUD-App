import { Component, TemplateRef, OnInit } from '@angular/core';
import { UserState } from '../+state/user.state';
import { Select, Store } from '@ngxs/store';
import { User } from '../../../core/interfaces/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteUser, GetUsers, SetSelectedUser } from '../../user/+state/user.action';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public gridLength: object;
  public modalRef: BsModalRef;
  public message: string;
  public isAction: string;
  public selectedUser: number;
  public selectedId: number;
  public type: string;

  @Select(UserState.getUserList) users: Observable<User[]>;

  constructor(
    private store: Store,
    private router: Router,
    private data: DataService,
    private modalService: BsModalService) {
  }


  openModal(template: TemplateRef<any>, user: User) {
    this.selectedUser = user.userId;
    this.selectedId = user.id;
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.isAction = message);
    this.users.subscribe(res => {
        this.gridLength = res;
        console.log(this.gridLength);
    });
    this.store.dispatch(new GetUsers());
  }

  confirm(id: number): void {
    console.log(id);
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.store.dispatch(new DeleteUser(id));
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  // deleteUser(id: number) {
  //     this.selectedUser = id;
  // }

  editUser(payload: User, type) {
      this.type = type;
      this.data.changeMessage(this.type);
      this.store.dispatch(new SetSelectedUser(payload));
  }

  userDetail(payload: User, type) {
      this.type = type;
      console.log(type);
      this.data.changeMessage(this.type);
      this.store.dispatch(new SetSelectedUser(payload));
  }

  addUser(type) {
    this.type = type;
    this.data.changeMessage(this.type);
    // this.router.navigateByUrl('adduser');
  }

}
