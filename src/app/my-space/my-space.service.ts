import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../our-space/topic';
import { Observable } from 'rxjs';
import { Commentary } from '../topic/commentary';

@Injectable()
export class MySpaceService {

    baseUrl = 'http://localhost:52356/api/topics';

    constructor(private httpClient: HttpClient) {

    }

    getTopic(): Observable<Topic> {
        return this.httpClient.get<Topic>(this.baseUrl + '/page', {withCredentials: true});
    }

    getCommentaries(id: string): Observable<Commentary[]> {
        return this.httpClient.get<Commentary[]>(this.baseUrl + '/' + id  + '/commentaries', {withCredentials: true});
    }

    createCommentary(id: string, commentary: Commentary): Observable<Commentary> {
        return this.httpClient.post<Commentary>(this.baseUrl + '/' + id + '/commentaries', commentary, {withCredentials: true});
    }
}
