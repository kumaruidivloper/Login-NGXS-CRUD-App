import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginUserData = {};

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
