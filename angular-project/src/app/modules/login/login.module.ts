import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from "src/app/services/user.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { LecturerService } from "src/app/services/lecturer.service";
import { CourseService } from "src/app/services/course.service";
import { Route, RouterModule, Routes } from "@angular/router";

const ROUTES:Routes=[
    {path: "register" ,component:RegisterComponent},
    {path: "register/:name/:password" ,component:RegisterComponent}
]

@NgModule({
    declarations: [LoginComponent,RegisterComponent],
    imports:[ MatInputModule,MatButtonModule,MatCardModule,
        FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule,
        RouterModule.forChild(ROUTES)],
        providers: [UserService,HttpClient,LecturerService,CourseService],
        bootstrap:[],  
        exports: [LoginComponent,RegisterComponent]
    
})
export class LoginModule{

}