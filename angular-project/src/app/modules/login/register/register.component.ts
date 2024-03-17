import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  nameFromLogin:string="";
  passwordFromLogin:string="";
  myUser:User=new User();
  showAlert: boolean = false; 
  users:User[];
  userForm: FormGroup=new FormGroup({
    userName: new FormControl(this.myUser.name ),
    userMail: new FormControl(this.myUser.mail),
    userAddress: new FormControl(this.myUser.address ),
    userPassword: new FormControl(this.myUser.password)
  });

  constructor(private _router: Router,  private router: ActivatedRoute,private _userService: UserService){}

  onSubmit() {

    //עדכון המשתנה myUser  
    this.myUser.name = this.userForm.controls['userName'].value;
    this.myUser.mail = this.userForm.controls['userMail'].value;
    this.myUser.address = this.userForm.controls['userAddress'].value;
    this.myUser.password = this.userForm.controls['userPassword'].value;
    //בדיקה האם הוא כבר קיים
    this._userService.getUsers().subscribe(data=>{
      this.users=data;
      const foundUser = this.users. find(u => u.mail === this.myUser.mail && u.name === this.myUser.name);
      if(foundUser){
        this.clearForm();
        this.showAlert = true;
      }
      else{
        //יצירת משתמש חדש
        console.log(this.myUser);
        this._userService.createUser(this.myUser).subscribe(data=>{
          console.log(data);
        })
        this._router.navigate(['/login']);
      }
    })


  }
  clearForm() {
    this.userForm.reset();
  }

  closeAlert() {
    this.showAlert = false;
  }

  ngOnInit() {
    this.router.paramMap.subscribe(p => {
      if (p.has("name"))
        this.nameFromLogin = p.get("name");
      if (p.has("password"))
        this.passwordFromLogin = p.get("password");
      this.userForm.patchValue({
        userName: this.nameFromLogin,
        userPassword: this.passwordFromLogin
      });
    });
  }
}
