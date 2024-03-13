import { Component, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
   
  pic:string="https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" ;

  isLect:boolean=false;
  _myCourse: Course
  public get myCourse(): Course {
    return this._myCourse;
  }
  @Input()
  public set myCourse(value: Course) {
    const storedJsonString0 = localStorage.getItem('currentCourse');
    const course= JSON.parse(storedJsonString0);
    this._myCourse=course;
  }

  constructor(){
    const storedJsonString0 = localStorage.getItem('currentCourse');
   const course= JSON.parse(storedJsonString0);
   this._myCourse=course;
   const storedJsonString1 = localStorage.getItem('isLect');
   const isLect= JSON.parse(storedJsonString1);
   const storedJsonString2 = localStorage.getItem('currentUser');
   const storedObject= JSON.parse(storedJsonString2);
   this.isLect=isLect;


  }
  
  isCloseStartDate(startDate: Date): boolean {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7); // תאריך של שבוע הקרוב
    return startDate <= nextWeek; // האם תאריך ההתחלה נמצא בשבוע הקרוב או לפניו
  }
  
}
