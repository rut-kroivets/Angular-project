import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../../models/category.model';
// add-course.component.ts

import { Study } from './../../../models/course.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  categoryList: Category[];
  

  typeList: string[] = Object.keys(Study)
    .filter(key => typeof Study[key] === 'string') // Filter out numeric values
    .map(key => Study[key]);

  notEmpty1: boolean = false;
  // notEmpty2: boolean = false;
  courseForm: FormGroup;
  syllabusItems: string[] = [];

  constructor(private formBuilder: FormBuilder, private _courseService: CourseService, private _categoryService: CategoryService) {
    this.courseForm = this.formBuilder.group({
      syllabus: [''],
      learning:[''],
      category:[''],
      dateOfStart:[''],
      countOfLessons:[''],
      name:[''],
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

  // removeSyllabusItem(index: number): void {
  //   this.syllabusItems.splice(index, 1);
  // }

  onSyllabusChange1(): void {

    if (this.courseForm.get('syllabus').value != '') {
      this.notEmpty1 = true;
    }
    else{
      this.notEmpty1=false;
    }
    // const lastItem = this.syllabusItems[this.syllabusItems.length - 1];
    // if (!lastItem || lastItem !== this.courseForm.get('syllabus').value) {
    //   this.syllabusItems.push(this.courseForm.get('syllabus').value);
    //   this.courseForm.get('syllabus').setValue('');
    // }
  }

  addSyllabusToList

  onSyllabusChange2():void{
    if (this.courseForm.get('syllabus').value != '') {
      this.syllabusItems.push(this.courseForm.get('syllabus').value);
      this.courseForm.get('syllabus').setValue('');
      this.onSyllabusChange1();
    }
    else{

    }
  }
  submitForm(): void {
    this.notEmpty1=false;

    this.saveCourse();
  }
  
  saveCourse(): void {

  }

}