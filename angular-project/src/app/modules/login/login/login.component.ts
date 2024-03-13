import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Lecturer } from 'src/app/models/lecturer.model';
import { LecturerService } from 'src/app/services/lecturer.service';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  lect: boolean = false;
  course: string = "";
  name: string = "";
  password: string = "";
  buttonluct: string='כניסה כמרצה';
  error: string = '';
  users: User[] = [];
  lecturers: Lecturer[] = [];
  courses: Course[] = [];
  constructor(private router: Router
    , private _userService: UserService,
    private _lecturerService: LecturerService,
    private _courseService: CourseService
  ) { }

  isLect() {
    this.lect = !this.lect;
    if(this.lect){
      this.buttonluct="כניסה כמשתמש";
    }
    else{
      this.buttonluct="כניסה כמרצה";
    }
  }

  login() {
    if (this.lect == true) {
      this._lecturerService.getLecturers().subscribe(data => {
        this.lecturers = data;

        // בדיקה אם קיים מרצה עם אותו שם מרצה
        const lecturerExists = this.lecturers.some(l => l.name === this.name);
        
        if (!lecturerExists) {
          this.error="You are not authorized to enter as a lecturer";
        }
        else {
          // קיים מרצה עם אותו שם מרצה - בדיקת סיסמה
          const matchingLect = this.lecturers.find(u => u.name === this.name);
          if (matchingLect.password !== this.password) {
            this.error = "the password is not correct";
          } else {
            this._courseService.getCourses().subscribe(data => {
              this.courses = data;

              console.log(this.course);
              console.log(this.courses);
              const matchCourse = this.courses.find(u => u.name === this.course);
              if (!matchCourse) {
                this.error = "there is no such a course"
              }
              else {
                if (matchCourse.lecturer.name !== this.name) {
                  this.error = "name of course is not correct"

                }
                else {
                  const jsonString1 = JSON.stringify(matchingLect);
                  localStorage.setItem('currentUser', jsonString1);
                  const jsonString2 = JSON.stringify(this.lect);
                  localStorage.setItem('isLect', jsonString2);
                  const jsonString3 = JSON.stringify(true);
                  localStorage.setItem('isConnect', jsonString3);
                  this.router.navigate(['/courses']);
                }
              }
            })
          }
        }
      }, err => { console.log("FIELD") });
    }
    else {


      this._userService.getUsers().subscribe(data => {
        this.users = data;

        // בדיקה אם קיים משתמש עם אותו שם משתמש
        var userExists = this.users.some(u => u.name === this.name);

        if (!userExists) {
          this.router.navigate(['/register',this.name,this.password]
          // , { queryParams: { name: this.name, password: this.password } }
          );
        } else {
          // קיים משתמש עם אותו שם משתמש - בדיקת סיסמה
          const matchingUser = this.users.find(u => u.name === this.name);
          if (matchingUser.password !== this.password) {
            this.error = "the password is not correct";
          } else {
            const jsonString1 = JSON.stringify(userExists);
            localStorage.setItem('currentUser', jsonString1);
            const jsonString2 = JSON.stringify(this.lect);
            localStorage.setItem('isLect', jsonString2);
            const jsonString3 = JSON.stringify(true);
            localStorage.setItem('isConnect', jsonString3);
            this.router.navigate(['/courses']);
          }
        }
      }, err => { console.log("FIELD") });
    }


  }


}
