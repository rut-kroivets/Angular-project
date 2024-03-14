import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../../models/category.model';
import { Course, Study } from './../../../models/course.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Lecturer } from 'src/app/models/lecturer.model';
import { ChangeDetectionStrategy } from '@angular/compiler';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  categoryList: Category[];
  myCourse: Course;
  myLect: Lecturer = new Lecturer();

  typeList: string[] = Object.keys(Study)
    .filter(key => typeof Study[key] === 'string') // Filter out numeric values
    .map(key => Study[key]);

  notEmpty1: boolean = false;
  // notEmpty2: boolean = false;
  courseForm: FormGroup = new FormGroup({
    "name": new FormControl('')
  });
  // courseForm: FormGroup = new form;
  syllabusItems: string[] = [];

  constructor(private formBuilder: FormBuilder, private _courseService: CourseService, private _categoryService: CategoryService) {
    const storedJsonString = localStorage.getItem('courseID');
    const ID = JSON.parse(storedJsonString);
    _courseService.getCourseById(ID).subscribe(data => {
      console.log('name is: ', data.name);
      
      this.courseForm = new FormGroup({
        name: new FormControl(data.name),

      })
    

      // this.courseForm.setControl('syllabus', this.formBuilder.array(this.myCourse.syllabus));
    });
  }

  ngOnInit(): void {
    // Call the CategoryService to get the categories
    this._categoryService.getCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

  }

  addSyllabusItem(): void {
    const syllabusItem = this.courseForm.get('syllabus').value;
    if (syllabusItem) {
      this.syllabusItems.push(syllabusItem);
      this.courseForm.get('syllabus').setValue('');
    }
  }

  

  onSyllabusChange1(): void {

    if (this.courseForm.get('syllabus').value != '') {
      this.notEmpty1 = true;
    }
    else {
      this.notEmpty1 = false;
    }
    
  }


  onSyllabusChange2(): void {
    if (this.courseForm.get('syllabus').value != '') {
      this.syllabusItems.push(this.courseForm.get('syllabus').value);
      this.courseForm.get('syllabus').setValue('');
      this.onSyllabusChange1();
    }
    else {

    }
  }
  submitForm(): void {
    this.notEmpty1 = false;

    this.saveCourse();
  }
 
  saveCourse(): void {

    const hh = localStorage.getItem("currentUser");
    const jj = JSON.parse(hh).value;
    console.log(jj);

    this.myLect = JSON.parse(hh);
    this.myCourse = {
      id: 0,
      name: this.courseForm.get('name').value,
      category: this.courseForm.get('category').value,
      countOfLessons: this.courseForm.get('countOfLessons').value,
      dateOfStart: this.courseForm.get('dateOfStart').value,
      syllabus: this.syllabusItems,
      study: this.courseForm.get('learning').value,
      image: this.courseForm.get('imageUrl').value,
      lecturer: this.myLect
    };
    console.log(this.myCourse);

    this._courseService.createCourse(this.myCourse).subscribe(
      () => {
        console.log()
        
      },
      (error) => {
        console.error('Error creating course:', error);
      }
    );

  }
}