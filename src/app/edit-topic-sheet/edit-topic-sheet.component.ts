import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Topic } from '../our-space/topic';
import { EditTopicSheetService } from './edit-topic-sheet.service';
import { JsonPatchDocument } from '../shared/jsonPatchDocument';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-topic-sheet',
  templateUrl: './edit-topic-sheet.component.html',
  styleUrls: ['./edit-topic-sheet.component.scss']
})
export class EditTopicSheetComponent implements OnInit {

  topic: Topic;
  @Output() edit = new EventEmitter();

  constructor(private editTopicSheetService: EditTopicSheetService,
            private snackBar: MatSnackBar) {
    this.topic = { id: '', title: '', description: ''};
   }

  ngOnInit() {
  }

  editTopic() {
    const patchDoc: JsonPatchDocument[] = [{ op: 'replace', path: '/description', value: this.topic.description }];
    this.editTopicSheetService.partiallyUpdateTopic(this.topic.id, patchDoc).subscribe(data => {
      this.editTopicSheetService.getTopic(this.topic.id).subscribe(t => this.topic = t);
      this.edit.emit();
      this.snackBar.open('Topic has been updated!', 'Thumbs up!', {
        duration: 3000
      });
    });
  }


}
