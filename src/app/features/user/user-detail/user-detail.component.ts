import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { UserState } from '../+state/user.state';
import { Observable } from 'rxjs';
import { User } from '../../../core/interfaces/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public userSelected: object;
  @Select(UserState.getSelectedUser) selectedUser: Observable<User>;

  constructor(private store: Store, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getUser(id);
    this.selectedUser.subscribe(user => {
      this.userSelected = user;
    });
  }

  getUser(id: number) {
    this.userService.selectedUsers(id).subscribe(selectedUser => {
      this.userSelected = selectedUser;
    });
  }

}
