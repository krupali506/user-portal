import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/components/user/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  editForm: boolean;
  id:number;
  viewMode: boolean;
  userDetails;
  constructor(private formBuilder: FormBuilder,private userService:UserService,private activatedRoute: ActivatedRoute,private router:Router) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      address: [''],
      phoneNumber: [''],
      profilePicture: [''],
    });


    this.activatedRoute.url.subscribe(data => {
      this.editForm = (data[0].path === 'updateUserDetails') ? true : false;
      this.viewMode = (data[0].path === 'userProfile') ? true : false;
      if (this.editForm) {
        this.activatedRoute.params.subscribe((data) => {
          this.registrationForm.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            gender: data.gender,
            education: data.education,
            email: data.email,
            password: data.password,
          });
          this.id = data.id;
        });
      }
      this.viewMode ? this.viewDetails() : '';
   })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    // Perform registration logic here
    const registrationData = this.registrationForm.value;

    // create and update user
    if(!this.editForm && !this.viewMode){
      delete registrationData.address;
      delete registrationData.phoneNumber;
      delete registrationData.profilePicture;
      this.userService.createUser(registrationData); 
     }
     else if(this.editForm && !this.viewMode)
     {
      delete registrationData.address;
      delete registrationData.phoneNumber;
      delete registrationData.profilePicture;
      registrationData.id = this.id;
      this.userService.updateUser(registrationData);
     }
     else{
      console.log(this.registrationForm);
      // if(this.registrationForm.valid){
        let data:any = {
          userId : this.id,
          address : this.registrationForm.get('address').value,
          phoneNumber : this.registrationForm.get('phoneNumber').value,
          profilePicture : this.registrationForm.get('profilePicture').value,
        }
        if(this.userDetails.length != 0){
          this.userDetails?.filter((info)=>{
            if(info.userId == this.id){
              data.id = info.id;
              this.userService.updateUserDetail(data);
            } 
            else {
              console.log(data);
              this.userService.createUserDetail(data);
            }
          })
        }
        else{
          console.log(data);
          this.userService.createUserDetail(data);
        }
        
      }
    //  }
     this.router.navigate(['/userDetails']);

    // Reset the form
    this.registrationForm.reset();
  }

  async viewDetails(){
    if(this.viewMode) {
      this.registrationForm.controls["address"].setValidators(Validators.required);
      this.registrationForm.controls["phoneNumber"].setValidators([Validators.required]);
      this.registrationForm.controls["profilePicture"].setValidators(Validators.required);
      let loginData = await this.userService.getEditData();
      if(loginData){
        this.getUserDetails();
        this.registrationForm.patchValue({
          firstName: loginData.firstName,
          lastName: loginData.lastName,
          middleName: loginData.middleName,
          gender: loginData.gender,
          education: loginData.education,
          email: loginData.email,
          password: loginData.password,
        });
        this.id = loginData.id;
      }
      else{
        this.router.navigate(['/login']);
      }
    }
  }

  // get user details
  async getUserDetails(){
    this.userDetails = await this.userService.getLoginUserInfo();
    this.userDetails?.filter((info)=>{
      if(info.userId == this.id){
        this.registrationForm.get('address').setValue(info.address),
        this.registrationForm.get('phoneNumber').setValue(info.phoneNumber),
        this.registrationForm.get('profilePicture').setValue(info.profilePicture)
      } 
    });
  }
}
