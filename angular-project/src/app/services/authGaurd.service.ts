import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
    constructor(private _router: Router) { }

    canActivate(): boolean {
        const storedJsonString = localStorage.getItem('isConnect');
         const isConnect = JSON.parse(storedJsonString);
        if (!isConnect) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You are not connected!",
                showConfirmButton: false,
                timer: 1500
              });
            this._router.navigate(['/login'])
            return false;  
        }
        return true;
    }
}