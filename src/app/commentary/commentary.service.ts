import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPatchDocument } from '../shared/jsonPatchDocument';
import { Observable } from 'rxjs';
import { Commentary } from '../topic/commentary';

@Injectable()
export class CommentaryService {

    baseUrl = 'http://localhost:52356/api/topics';

    constructor(private httpClient: HttpClient) {

    }

    deleteCommentaryForTopic(topicId: string, id: string) {
        return this.httpClient.delete(this.baseUrl + '/' + topicId  + '/commentaries/' + id, {withCredentials: true});
    }

    partiallyUpdateCommentary(topicId: string, id: string, jsonPatchDoc: JsonPatchDocument[]) {
        return this.httpClient.patch(this.baseUrl + '/' + topicId  + '/commentaries/' + id, jsonPatchDoc, {withCredentials: true});
    }

    getCommentaryForTopic(topicId: string, id: string): Observable<Commentary> {
        return this.httpClient.get<Commentary>(this.baseUrl + '/' + topicId  + '/commentaries/' + id, {withCredentials: true});
    }

}
