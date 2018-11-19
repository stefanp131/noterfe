import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from './registerModel';

@Injectable()
export class RegisterService {

    baseUrl = 'http://localhost:52356/api';


    constructor(private http: HttpClient) { }

    register(registerModel: RegisterModel) {
        return this.http.post(this.baseUrl + '/register', registerModel, {observe: 'response'});
    }
}
