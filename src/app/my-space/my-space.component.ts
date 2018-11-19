import { Component, OnInit } from '@angular/core';
import { Topic } from '../our-space/topic';
import { Commentary } from '../topic/commentary';
import { MySpaceService } from './my-space.service';

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.scss']
})
export class MySpaceComponent implements OnInit {

  topic: Topic = { id: '', title: '', description: ''};
  commentary: Commentary;
  commentaries: Commentary[];

  constructor(private mySpaceService: MySpaceService) {
    this.commentary = { title: '', content: '', topicId: '' };
   }

  ngOnInit() {
    this.mySpaceService.getTopic().subscribe(data => {
        this.topic = data;
        if (this.topic !== null) {
          this.commentary.topicId = this.topic.id ;
          this.mySpaceService.getCommentaries(this.topic.id)
          .subscribe(comms => this.commentaries = comms);
        }
      });
  }

  createCommentary() {
    this.commentary.topicId = this.topic.id;
    this.mySpaceService.createCommentary(this.topic.id, this.commentary).subscribe(data => location.reload());
  }
}
