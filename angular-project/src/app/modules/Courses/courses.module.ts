import { NgModule } from "@angular/core";
import { CourseService } from "src/app/services/course.service";
import { AddCourseComponent } from "./add-course/add-course.component";
import { AllCoursesComponent } from "./all-courses/all-courses.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { CoursesRoutingModule } from "./courses-routing.module";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { MatListModule } from '@angular/material/list';
import { DatePipe, NgFor, NgIf } from "@angular/common";
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { CategoryService } from "src/app/services/category.service";
import { MatCardModule } from "@angular/material/card";




@NgModule({
    declarations: [AllCoursesComponent,
        AddCourseComponent,
        CourseDetailsComponent,
        EditCourseComponent, ],
    imports:[ CoursesRoutingModule,
        MatListModule,NgFor,NgIf, FormsModule, ReactiveFormsModule, MatCardModule,
        DatePipe
    ],
        providers: [CourseService, CategoryService,DatePipe],
        bootstrap:[],  
        exports: [AllCoursesComponent,
            AddCourseComponent,
            CourseDetailsComponent,
            EditCourseComponent, ]
    
})
export class CoursesModule{

}