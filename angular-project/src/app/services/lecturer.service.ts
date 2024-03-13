import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lecturer } from "../models/lecturer.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LecturerService {
  private readonly apiUrl: string = "/api/Lecturer";

  constructor(private _http: HttpClient) {}

  // קבלת כל המרצים
  getLecturers(): Observable<Lecturer[]> {
    return this._http.get<Lecturer[]>(this.apiUrl);
  }

  // קבלת מרצה לפי מזהה
  getLecturerById(id: number): Observable<Lecturer> {
    return this._http.get<Lecturer>(`${this.apiUrl}/${id}`);
  }

  // יצירת מרצה חדש
  createLecturer(lecturer: Lecturer): Observable<Lecturer> {
    return this._http.post<Lecturer>(this.apiUrl, lecturer);
  }

  // עדכון פרטי מרצה
  updateLecturer(lecturer: Lecturer): Observable<Lecturer> {
    return this._http.put<Lecturer>(`${this.apiUrl}/${lecturer.id}`, lecturer);
  }

  // מחיקת מרצה לפי מזהה
  deleteLecturer(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }
}