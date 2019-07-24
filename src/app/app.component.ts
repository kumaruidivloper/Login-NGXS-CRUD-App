import { Component, OnInit, ChangeDetectionStrategy, } from '@angular/core';
import { AuthService } from '../app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Login-NGXS-CRUD-App';
  public user = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewChecked() {
    this.user = localStorage.getItem('user');
  }
}

