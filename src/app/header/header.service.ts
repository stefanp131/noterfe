import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class HeaderService {

    baseUrl = 'http://localhost:52356/api';

    constructor(private http: HttpClient) { }

    getUsername() {
        return this.http.get(this.baseUrl + '/username', {withCredentials: true, responseType: 'text'});
    }
}
