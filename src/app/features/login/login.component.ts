import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
     }

    createForm() {
      this.loginForm = this.fb.group({
         email: ['', Validators.required ],
         password: ['', Validators.required ]
      });
    }

  ngOnInit() {
  }

  loginUser() {
    this.auth.loginUser(this.loginForm.value)
    .subscribe(
      res => {
        alert(res);
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/customer']);
      },
      err => console.log(err)
    );
  }

}
