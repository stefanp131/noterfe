import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Commentary } from './commentary';
import { CommentaryForCreation } from './commentaryForCreation';
import { Topic } from '../our-space/topic';
import { JsonPatchDocument } from '../shared/jsonPatchDocument';

@Injectable()
export class TopicService {

    constructor(private httpClient: HttpClient) { }

    baseUrl = 'http://localhost:52356/api/topics';

    getTopic(id: string): Observable<Topic> {
        return this.httpClient.get<Topic>(this.baseUrl + '/' + id, {withCredentials: true});
    }

    getCommentaries(id: string, pageNumber: number, pageSize: number): Observable<HttpResponse<Commentary[]>> {
        return this.httpClient.get<Commentary[]>(this.baseUrl + '/' + id  + '/commentaries' + '?pageNumber=' + pageNumber
        + '&pageSize=' + pageSize , {observe: 'response', withCredentials: true});
    }

    getCommentariesFromUrl(url: string): Observable<HttpResponse<Commentary[]>> {
        return this.httpClient.get<Commentary[]>(url, {observe: 'response', withCredentials: true});
    }

    createCommentary(id: string, commentary: Commentary): Observable<Commentary> {
        return this.httpClient.post<Commentary>(this.baseUrl + '/' + id + '/commentaries', commentary, {withCredentials: true});
    }

    deleteCommentaryForTopic(topicId: string, id: string) {
        return this.httpClient.delete(this.baseUrl + '/' + topicId  + '/commentaries/' + id, {withCredentials: true});
    }

    partiallyUpdateCommentary(topicId: string, id: string, jsonPatchDoc: JsonPatchDocument[]) {
        return this.httpClient.patch(this.baseUrl + '/' + topicId  + '/commentaries/' + id, jsonPatchDoc, {withCredentials: true});
    }
}
