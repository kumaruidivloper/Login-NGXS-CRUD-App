import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = 'http://localhost:5000/api/customer';
  constructor(private http: HttpClient) { }

  getCustomer() {
    return this.http.get<any>(this.customerUrl);
  }
}
