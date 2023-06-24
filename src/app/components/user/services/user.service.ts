import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserDetail } from '../model/user/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  loginDetails: any;
  constructor(private http: HttpClient) { }

  private usersUrl = 'http://localhost:3000/';

  // get user details
  getUserDetails() {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.usersUrl}users`).subscribe((res: any) => {
        if (res) {
          resolve(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  // create user
  createUser(user: User) {
    return this.http.post(`${this.usersUrl}users`, user).toPromise();
  }

  // update user
  updateUser(user: User) {
    return this.http.put(`${this.usersUrl}users/${user.id}`, user).toPromise();
  }

  // delete user
  deleteUser(user:User){
    return this.http.delete(`${this.usersUrl}users/${user.id}`).toPromise();
  } 

  // To set the login details
  setEditData(data) {
    return this.loginDetails = data;
  }

  // To get the login details
  getEditData() {
    return this.loginDetails;
  }

  getLoginUserInfo() {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(`${this.usersUrl}userDetails`).subscribe((res: any) => {
        if (res) {
          resolve(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  // create user details
  createUserDetail(user) {
    return this.http.post(`${this.usersUrl}userDetails`, user).toPromise();
  }

  // update user details
  updateUserDetail(user) {
    return this.http.put(`${this.usersUrl}userDetails/${user.id}`, user).toPromise();
  }

  // delete user details
  deleteUserDetail(user) {
    return this.http.delete(`${this.usersUrl}userDetails/${user.id}`).toPromise();
  }
}
