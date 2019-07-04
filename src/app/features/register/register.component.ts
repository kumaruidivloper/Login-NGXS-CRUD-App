import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerUserData = {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.registerUserData);
  }

}
