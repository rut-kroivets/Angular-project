import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardServiceAdd implements CanActivate {
    constructor(private _router: Router) { }

    canActivate(): boolean {
            const storedJsonString = localStorage.getItem('isLect');
         const isLect = JSON.parse(storedJsonString);
         if(!isLect){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You are not Lecturer!",
                showConfirmButton: false,
                timer: 1500
              });
              return false;  
         }
         return true;
    }

    
}