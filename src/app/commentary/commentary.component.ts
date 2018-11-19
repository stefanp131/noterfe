import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef,
  ViewChild, ComponentRef, Output, EventEmitter } from '@angular/core';
import { Commentary } from '../topic/commentary';
import { CommentaryService } from './commentary.service';
import { JsonPatchDocument } from '../shared/jsonPatchDocument';
import { EditCommentaryComponent } from '../edit-commentary/edit-commentary.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss']
})
export class CommentaryComponent implements OnInit {

  @Input() page: string;
  @Input() commentary: Commentary;
  @Output() event = new EventEmitter();
  @ViewChild('container', { read: ViewContainerRef }) entry: ViewContainerRef;
  showEdit: boolean;
  componentRef: ComponentRef<EditCommentaryComponent>;

  constructor(private commentaryService: CommentaryService,
    private componentFactoryResolver: ComponentFactoryResolver, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  deleteCommentaryForTopic(id: string) {
    this.commentaryService.deleteCommentaryForTopic(this.commentary.topicId, id).subscribe(() => {
      this.event.emit();
      this.snackBar.open('Commentary has been deleted!', 'Thumbs up!', {
        duration: 3000
      });
    });
  }

  updateApproval(id: string) {
    const approval = this.commentary.approval + 1;
    const jsonPatch: JsonPatchDocument[] = [{ op: 'replace', path: '/approval', value: approval.toString() }];
    this.commentaryService.partiallyUpdateCommentary(this.commentary.topicId, id, jsonPatch).subscribe(data => {
      this.commentaryService.getCommentaryForTopic(this.commentary.topicId, id)
      .subscribe(c => this.commentary = c);
      this.snackBar.open('Commentary has been upvoted!', 'Thumbs up!', {
        duration: 3000
      });
    });
  }

  showEditCommentary() {
    this.showEdit = !this.showEdit;
    if (this.showEdit) {
       const factory = this.componentFactoryResolver.resolveComponentFactory(EditCommentaryComponent);
        this.componentRef = this.entry.createComponent(factory);
        this.componentRef.instance.commentary = this.commentary;
        this.componentRef.instance.page = this.page;
        this.componentRef.instance.edit.subscribe(data => this.onEdit());
      } else {
      this.componentRef.destroy();
    }
  }
  onEdit() {
    this.showEdit = !this.showEdit;
    this.componentRef.destroy();
  }
}
