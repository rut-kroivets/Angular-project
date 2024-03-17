import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {

  courses: Course[];
  searchText: string = '';
  
  constructor(private router: Router, private _courseService: CourseService) {
    this._courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  get filteredCourses(): Course[] {
    if (!this.searchText.trim()) {
      return this.courses;
    }
    return this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selecteCourse(c: Course) {
    localStorage.setItem('currentCourse', JSON.stringify(c));
    this.router.navigate(['/details']);
  }
}