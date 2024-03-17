import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../../models/category.model';
// add-course.component.ts

import { Course, Study } from './../../../models/course.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Lecturer } from 'src/app/models/lecturer.model';
// import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],

})
export class AddCourseComponent implements OnInit {
  categoryList: Category[];
  myCourse: Course;
  myLect: Lecturer= new Lecturer();

  typeList: string[] = Object.keys(Study)
    .filter(key => typeof Study[key] === 'string') // Filter out numeric values
    .map(key => Study[key]);

  notEmpty1: boolean = false;
  // notEmpty2: boolean = false;
  courseForm: FormGroup;
  syllabusItems: string[] = [];

  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder, private _courseService: CourseService, private _categoryService: CategoryService) {
    this.courseForm = this.formBuilder.group({
      syllabus: [''],
      learning: [''],
      category: [''],
      dateOfStart: [''],
      countOfLessons: [''],
      name: [''],
      imageUrl: [''],
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

  setSelectedCategory(categoryId: string): void {
    const selectedCategory = this.categoryList.find(cat => cat.id === parseInt(categoryId));
    this.courseForm.get('category').setValue(selectedCategory);
}


  addSyllabusItem(): void {
    const syllabusItem = this.courseForm.get('syllabus').value;
    if (syllabusItem) {
      this.syllabusItems.push(syllabusItem);
      this.courseForm.get('syllabus').setValue('');
    }
  }

  // removeSyllabusItem(index: number): void {
  //   this.syllabusItems.splice(index, 1);
  // }

  onSyllabusChange1(): void {

    if (this.courseForm.get('syllabus').value != '') {
      this.notEmpty1 = true;
    }
    else {
      this.notEmpty1 = false;
    }
    // const lastItem = this.syllabusItems[this.syllabusItems.length - 1];
    // if (!lastItem || lastItem !== this.courseForm.get('syllabus').value) {
    //   this.syllabusItems.push(this.courseForm.get('syllabus').value);
    //   this.courseForm.get('syllabus').setValue('');
    // }
  }

  // addSyllabusToList

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
  //   lecturer: Lecturer;
  //   image: string;
  saveCourse(): void { 
    const hh = localStorage.getItem("currentUser");
    const jj = JSON.parse(hh);
  console.log(jj);
  this.setSelectedCategory(this.courseForm.get('category').value);
const newformat=this.datePipe.transform(this.courseForm.get('dateOfStart').value, 'yyyy/MM/dd');

    this.myLect = jj;
    this.myCourse = {
      id: 0,
      name: this.courseForm.get('name').value,
      category: (this.courseForm.get('category').value),
      countOfLessons: this.courseForm.get('countOfLessons').value,
      dateOfStart: new Date(newformat),
      syllabus: this.syllabusItems,
      study: this.courseForm.get('learning').value,
      image: this.courseForm.get('imageUrl').value,
      lecturer: this.myLect
    };
  console.log('3333');
  
    console.log(this.myCourse);

    this._courseService.createCourse(this.myCourse).subscribe(
      () => {
        console.log("success")
        // ההוספה הצליחה, מעבירה לעמוד ה-all
        // this.router.navigate(['/all']);
      },
      (error) => {
        console.error('Error creating course:', error);
        console.log("not good");
        
        // טיפול בשגיאה כאן לפי הצורך
      }
    );

  }
}