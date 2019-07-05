import { Component } from '@angular/core';
import { AuthService } from '../app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Login-NGXS-CRUD-App';

  constructor(private authService: AuthService) {}
}
