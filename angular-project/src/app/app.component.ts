import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project';

  isConnect: boolean=false;
  constructor(private router: Router) {
    // הרשמה לאירוע NavigationEnd המתרחש בכל פעם שיש שינוי בניווט באפליקציה
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // בכל פעם שיש שינוי בניווט, בדוק אם המשתמש מחובר
        this.checkUserConnection();
      }
    });
  }

  // בדיקה האם המשתמש מחובר
  checkUserConnection(): void {
    const storedJsonString = localStorage.getItem('isConnect');
    const isConnect = JSON.parse(storedJsonString);
    this.isConnect = isConnect;
  }
  logOut(){
    const jsonString = JSON.stringify(false);
    localStorage.setItem('isConnect', jsonString);
    this.isConnect=false;
    const jsonString1 = JSON.stringify(null);
   localStorage.setItem('currentUser', jsonString1);
    this.router.navigate(['/']);
  }
  shouldShowRouterOutlet(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '/';
  }
  
}
