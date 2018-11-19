import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPatchDocument } from '../shared/jsonPatchDocument';
import { Observable } from 'rxjs';
import { Topic } from '../our-space/topic';

@Injectable()
export class EditTopicSheetService {

    baseUrl = 'http://localhost:52356/api/topics';

    constructor(private httpClient: HttpClient) { }

    partiallyUpdateTopic(id: string, jsonPatchDoc: JsonPatchDocument[]) {
        return this.httpClient.patch(this.baseUrl + '/' + id, jsonPatchDoc, {withCredentials: true});
    }

    getTopic(id: string): Observable<Topic> {
        return this.httpClient.get<Topic>(this.baseUrl + '/' + id, {withCredentials: true});
    }
}
