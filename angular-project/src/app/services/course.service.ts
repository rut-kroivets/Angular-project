import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../models/course.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CourseService {
  private readonly apiUrl: string = "/api/Course";

  constructor(private _http: HttpClient) {}

  // קבלת כל הקורסים
  getCourses(): Observable<Course[]> {
    return this._http.get<Course[]>(this.apiUrl);
  }

  // קבלת קורס לפי מזהה
  getCourseById(id: number): Observable<Course> {
    return this._http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // יצירת קורס חדש
  createCourse(course: Course): Observable<Course> {
    return this._http.post<Course>(this.apiUrl, course);
  }

  // עדכון פרטי קורס
  updateCourse(course: Course): Observable<Course> {
    return this._http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  // מחיקת קורס לפי מזהה
  deleteCourse(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }
}