import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import {HttpClient} from "@angular/common/http"

@Injectable()
export class UserService{
    private readonly apiUrl: string = "/api/User";

    constructor(private _http: HttpClient){

    }
     // קבלת כל המשתמשים
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.apiUrl);
  }

  // קבלת משתמש לפי מזהה
  getUserById(id: number): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/${id}`);
  }

  // יצירת משתמש חדשPOST
  createUser(user: User): Observable<User> {
    return this._http.post<User>(this.apiUrl, user);
  }

  // עדכון פרטי משתמשPUT
  updateUser(user: User): Observable<User> {
    return this._http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  // מחיקת משתמש לפי מזההDELETE
  deleteUser(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }
}