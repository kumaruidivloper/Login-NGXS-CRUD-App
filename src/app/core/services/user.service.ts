import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3000/sampleProducts';
  constructor(private http: HttpClient) { }

  fetchUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  selectedUsers(id: number) {
    return this.http.get<User[]>(`${this.userUrl}/${id}`);
}

  deleteUser(id: number) {
      return this.http.delete(`${this.userUrl}/${id}`);
  }

  addUser(payload: User) {
      return this.http.post<User>(`${this.userUrl}`, payload);
  }

  updateUser(payload: User, id: number) {
      return this.http.put<User>(`${this.userUrl}/${id}`, payload);
  }
}
