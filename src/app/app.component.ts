import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Login-NGXS-CRUD-App';

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }
}

