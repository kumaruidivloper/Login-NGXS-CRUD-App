import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public customer = [];

  constructor(private customerService: UserService, private router: Router) { }

  ngOnInit() {
    this.customerService.fetchUsers()
    .subscribe(
      res => this.customer = res,
      err => {
        if (err instanceof HttpErrorResponse) {
           if (err.status === 401) {
            this.router.navigate(['user']);
           }
        }
      }
    );
  }

}
