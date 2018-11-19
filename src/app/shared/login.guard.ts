import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';


@Injectable()
export class LoginGuardService implements CanActivate {
    isAuthenticated = false;

    constructor(private cookieService: CookieService, private router: Router) {
    }
    canActivate(): Observable<boolean> {
        this.isAuthenticated = this.cookieService.check('.AspNetCore.cookies');
        if (!this.isAuthenticated) {
            this.router.navigate(['/login']);
            return of(false);
        }
        return of(true);
    }
}
