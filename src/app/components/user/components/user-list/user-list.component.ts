import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // users:User[];
  users:any;
  searchQuery: string = '';
  filteredUsers: any[];
  selectedUser:User;
  @ViewChild('exampleModal') modalElement!: ElementRef;

  constructor(private router: Router,private userService:UserService) {
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  // get user details
  async getUserDetails(){
    this.users = await this.userService.getUserDetails();
    this.filteredUsers = this.users;
  }

  // logout
  logout() {
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }

  // edit user
  editUser(user: User) {
    this.router.navigate(['/updateUserDetails',user]);
  }

  // delete user
  deleteUser() {
    this.userService.deleteUser(this.selectedUser);
  // Close the modal
  if (this.modalElement) {
    const modalNativeElement = this.modalElement.nativeElement;
    modalNativeElement.classList.remove('show');
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
      modalNativeElement.classList.add('d-none');
    }
  }
    this.getUserDetails();
  }

  applyFilter() {
    this.users = this.filteredUsers;
    if (this.searchQuery === '') {
      this.users = this.filteredUsers;
    } else {
      
      this.users = this.users.filter((user:any) => user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) || user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) || user.gender.toLowerCase().includes(this.searchQuery.toLowerCase()) || user.education.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.users = this.filteredUsers;
  }

  openModal(user) {
    this.selectedUser = user;
    const modalNativeElement = this.modalElement.nativeElement;
    modalNativeElement.classList.add('show');
    document.body.classList.add('modal-open');
    modalNativeElement.classList.remove('d-none');
  }
}
