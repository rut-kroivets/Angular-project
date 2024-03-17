import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../../models/category.model';
import { Course, Study } from './../../../models/course.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Lecturer } from 'src/app/models/lecturer.model';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  categoryList: Category[];
  myCourse: Course;
  myLect: Lecturer = new Lecturer();
 ID:number;
  typeList: string[] = Object.keys(Study)
    .filter(key => typeof Study[key] === 'string') // Filter out numeric values
    .map(key => Study[key]);


  courseForm: FormGroup = new FormGroup({
    "name": new FormControl(''),
    "countOfLessons": new FormControl(''),
    "dateOfStart": new FormControl(''),
    "imageUrl": new FormControl(''),
    "learning": new FormControl(''),
    "category": new FormControl(''),
    "syllabus":new FormControl(''),
  });
  syllabusItems: string[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private _courseService: CourseService, private _categoryService: CategoryService) {
    const storedJsonString = localStorage.getItem('courseID');
     this.ID = JSON.parse(storedJsonString);
    _courseService.getCourseById(this.ID).subscribe(data => {

      console.log('name is: ', data.name);
this.syllabusItems=data.syllabus;
      this.courseForm = new FormGroup({
        name: new FormControl(data.name),
        countOfLessons: new FormControl(data.countOfLessons),
        dateOfStart: new FormControl(data.dateOfStart),
        imageUrl: new FormControl(data.image),
        learning: new FormControl(data.study),
        category: new FormControl(data.category),
        syllabus:new FormControl(data.syllabus)
      })
    });
  }

  
  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

  }

 
  submitForm(): void {
    this.saveCourse();
  }

  saveCourse(): void {

    const hh = localStorage.getItem("currentUser");
    const jj = JSON.parse(hh).value;

    this.myLect = JSON.parse(hh);
    this.myCourse = {
      id: this.ID,
      name: this.courseForm.get('name').value,
      category: this.courseForm.get('category').value,
      countOfLessons: this.courseForm.get('countOfLessons').value,
      dateOfStart: this.courseForm.get('dateOfStart').value,
      syllabus: this.courseForm.get('syllabus').value,
      study: this.courseForm.get('learning').value,
      image: this.courseForm.get('imageUrl').value,
      lecturer: this.myLect
    };
    console.log(this.myCourse);

    this._courseService.updateCourse(this.myCourse).subscribe(
      () => {
        console.log("Course updated successfully");

      this._courseService.getCourses().subscribe(
        (updatedCourse) => {
          console.log("Updated course:", updatedCourse);
        },
        (error) => {
          console.error('Error fetching updated course:', error);
        }
      );
      const jsonString = JSON.stringify(this.myCourse);

      localStorage.setItem('currentCourse', jsonString);
        this.router.navigate(['/details']);
      },
      (error) => {
        console.error('Error creating course:', error);
      }
    );

  }
}
