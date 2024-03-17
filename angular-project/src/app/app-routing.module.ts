import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddCourseComponent } from './modules/Courses/add-course/add-course.component';
import { AllCoursesComponent } from './modules/Courses/all-courses/all-courses.component';
import { CourseDetailsComponent } from './modules/Courses/course-details/course-details.component';
import { EditCourseComponent } from './modules/Courses/edit-course/edit-course.component';
import { LoginComponent } from './modules/login/login/login.component';
import { RegisterComponent } from './modules/login/register/register.component';

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "courses", component: AllCoursesComponent,
    // children: [
    //   { path: "add", component: AddCourseComponent },
    //  { path: "details", component: CourseDetailsComponent },
    //   { path: "edit", component: EditCourseComponent },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
