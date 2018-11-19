import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginDataService } from './login.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginResolverService implements Resolve<any> {

    constructor(private loginDataService: LoginDataService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        return this.loginDataService.getData().toPromise().then(response => this.loginDataService.setResult(response));
    }
}
