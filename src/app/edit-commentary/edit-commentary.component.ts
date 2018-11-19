import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Commentary } from '../topic/commentary';
import { JsonPatchDocument } from '../shared/jsonPatchDocument';
import { EditCommentaryService } from './edit-commentary.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-commentary',
  templateUrl: './edit-commentary.component.html',
  styleUrls: ['./edit-commentary.component.scss']
})
export class EditCommentaryComponent implements OnInit {

  @Input() page: string;
  @Input() commentary: Commentary = { id: '', title: '', topicId: '', content: '', approval: 0 };
  @Output() edit = new EventEmitter();

  constructor(private editCommentaryService: EditCommentaryService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  editCommentary(id: string) {
    const jsonPatch: JsonPatchDocument[] = [{ op: 'replace', path: '/content', value: this.commentary.content }];
    this.editCommentaryService.partiallyUpdateCommentary(this.commentary.topicId, id, jsonPatch).subscribe(data => {
      this.editCommentaryService.getCommentaryForTopic(this.commentary.topicId, id)
      .subscribe(c => this.commentary = c);
      this.edit.emit();
      this.snackBar.open('Commentary has been updated!', 'Thumbs up!', {
        duration: 3000
      });
    });
  }
}
