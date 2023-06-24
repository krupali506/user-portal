import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/user/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: any;
  showErrorMessage: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    });
    this.getUserDetails();
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    // Perform login logic here
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    // set the values in session storage
    sessionStorage.setItem("Email", email);
    sessionStorage.setItem("Password", password);

    if (this.users.length != 0) {
      //  check login details
      this.users.filter((user) => {
        if (user.email == email && user.password == password) {
          this.userService.setEditData(user);
          this.router.navigate(['/userDetails']);
        }
        else {
          this.showErrorMessage = true;
          // Reset the form
          this.loginForm.reset();
        }
      });
    }
    else {
      this.showErrorMessage = true;
      // Reset the form
      this.loginForm.reset();
    }

  }

  // get user details
  async getUserDetails() {
    this.users = await this.userService.getUserDetails();
  }
}
