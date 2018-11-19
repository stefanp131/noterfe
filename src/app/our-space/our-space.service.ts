import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Topic } from './topic';
import { Observable } from 'rxjs';
import { JsonPatchDocument } from '../shared/jsonPatchDocument';

@Injectable()
export class OurSpaceService {
    constructor(private http: HttpClient) { }

    baseUrl = 'http://localhost:52356/api/topics';

    getTopics(pageNumber: number, pageSize: number): Observable<HttpResponse<Topic[]>> {
        return this.http.get<Topic[]>(this.baseUrl + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize,
         {observe: 'response', withCredentials: true});
    }

    getTopicsFromUrl(url: string): Observable<HttpResponse<Topic[]>> {
        return this.http.get<Topic[]>(url, {observe: 'response', withCredentials: true});
    }

    getTopicsBySearch(pageNumber: number, pageSize: number, title: string): Observable<HttpResponse<Topic[]>> {
        return this.http.get<Topic[]>(this.baseUrl + '?pageNumber=' + pageNumber + '&pageSize='
         + pageSize + '&searchTitle=' + title, {observe: 'response', withCredentials: true});
    }

    getTopic(id: string): Observable<Topic> {
        return this.http.get<Topic>(this.baseUrl + '/' + id, {withCredentials: true});
    }

    createTopic(topic: Topic) {
       return this.http.post<Topic>(this.baseUrl, topic, {withCredentials: true});
    }

    deleteTopic(id: string) {
        return this.http.delete(this.baseUrl + '/' + id, {withCredentials: true});
    }

    partiallyUpdateTopic(id: string, jsonPatchDoc: JsonPatchDocument[]) {
        return this.http.patch(this.baseUrl + '/' + id, jsonPatchDoc, {withCredentials: true});
    }
}
