import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public returnUrl: string;
  public loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
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
      // reset login status
      this.auth.logoutUser();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
