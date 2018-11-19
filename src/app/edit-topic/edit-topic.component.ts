import { Component, OnInit, Input, ViewContainerRef, ViewChild,
  ComponentFactoryResolver, ComponentRef, Output, EventEmitter } from '@angular/core';
import { Topic } from '../our-space/topic';
import { OurSpaceService } from '../our-space/our-space.service';
import { EditTopicSheetComponent } from '../edit-topic-sheet/edit-topic-sheet.component';
import { JsonPatchDocument } from '../shared/jsonPatchDocument';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {

@Input() topic: Topic;
@Output() event = new EventEmitter();

@ViewChild('container', { read: ViewContainerRef }) entry: ViewContainerRef;
showEdit: boolean;
componentRef: ComponentRef<EditTopicSheetComponent>;


  constructor(private ourSpaceService: OurSpaceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  editTopic() {
  }

  deleteTopic(id: string) {
    this.ourSpaceService.deleteTopic(id).subscribe(() => {
      this.event.emit();
      this.snackBar.open('Topic has been deleted!', 'Thumbs up!', {
        duration: 3000
       });
    });
  }

  showEditTopic() {
    this.showEdit = !this.showEdit;
    if (this.showEdit) {
       const factory = this.componentFactoryResolver.resolveComponentFactory(EditTopicSheetComponent);
        this.componentRef = this.entry.createComponent(factory);
        this.componentRef.instance.topic = this.topic;
        this.componentRef.instance.edit.subscribe(data => this.onEdit());
      } else {
      this.componentRef.destroy();
    }
  }

  onEdit() {
    this.showEdit = !this.showEdit;
    this.componentRef.destroy();
  }

  updateApproval(id: string) {
    const patchDoc: JsonPatchDocument [] = [{op: 'replace', path: 'approval', value: (this.topic.approval + 1).toString()}];
    this.ourSpaceService.partiallyUpdateTopic(id, patchDoc).subscribe(() => {
      this.ourSpaceService.getTopic(id).subscribe(t => this.topic = t);
      this.snackBar.open('Topic has been upvoted!', 'Thumbs up!', {
        duration: 3000
      });
    });
  }
}

