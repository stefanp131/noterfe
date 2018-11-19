import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './loginModel';

@Injectable()
export class LoginService {

    baseUrl = 'http://localhost:52356/api';


    constructor(private http: HttpClient) { }

    login(loginModel: LoginModel) {
        return this.http.post(this.baseUrl + '/login', loginModel, {observe: 'response', withCredentials: true});
    }

    logout() {
        return this.http.post(this.baseUrl + '/logout', {}, {observe: 'response', withCredentials: true});
    }
}
