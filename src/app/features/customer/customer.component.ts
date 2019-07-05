import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customer = [];

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.customerService.getCustomer()
    .subscribe(
      res => this.customer = res,
      err => {
        if (err instanceof HttpErrorResponse) {
           if (err.status === 401) {
            this.router.navigate(['/login']);
           }
        }
      }
    );
  }

}
