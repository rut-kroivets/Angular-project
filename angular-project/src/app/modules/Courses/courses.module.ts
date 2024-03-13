import { NgModule } from "@angular/core";
import { CourseService } from "src/app/services/course.service";
import { AddCourseComponent } from "./add-course/add-course.component";
import { AllCoursesComponent } from "./all-courses/all-courses.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { CoursesRoutingModule } from "./courses-routing.module";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { MatListModule } from '@angular/material/list';
import { NgFor, NgIf } from "@angular/common";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryService } from "src/app/services/category.service";




@NgModule({
    declarations: [AllCoursesComponent,
        AddCourseComponent,
        CourseDetailsComponent,
        EditCourseComponent, ],
    imports:[ CoursesRoutingModule,
        MatListModule,NgFor,NgIf, FormsModule, ReactiveFormsModule
    ],
        providers: [CourseService, CategoryService],
        bootstrap:[],  
        exports: [AllCoursesComponent,
            AddCourseComponent,
            CourseDetailsComponent,
            EditCourseComponent, ]
    
})
export class CoursesModule{

}