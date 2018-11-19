import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginDataService {

    result: boolean;

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get<boolean>('http://localhost:52356/api/authenticated', { withCredentials: true});
    }

    setResult(res: boolean) {
        this.result = res;
    }

    getResult(): boolean {
        return this.result;
    }


}
