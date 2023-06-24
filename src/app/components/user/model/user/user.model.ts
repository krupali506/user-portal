export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  education: string;
  password: string;
}

export interface UserDetail {
  id: number;
  address : string;
  phoneNumber : string;
  profilePicture : string;
  userId:number;
}
