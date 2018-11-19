import { Component, OnInit } from '@angular/core';
import { Commentary } from './commentary';
import { TopicService } from './topic.service';
import { ActivatedRoute } from '@angular/router';
import { Topic } from '../our-space/topic';
import { Pagination } from '../shared/pagination';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  topic: Topic;
  commentaries: Commentary[];
  commentary: Commentary;
  id: string;
  pagination: Pagination;
  selected = 5;

  constructor(private topicService: TopicService, private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.topic = { id: '', title: '', description: ''};
    this.commentary = { title: '', content: '' , topicId: this.id};
    this.pagination = {totalCount: 0, pageSize: 0, currentPage: 0, totalPages: 0, previousPage: '', nextPage: ''};
  }

  ngOnInit() {
    this.refreshData();
  }

  getCommentaries() {
    this.topicService.getCommentaries(this.topic.id, 1, this.selected).subscribe(data => {this.commentaries = data.body;
      const paginationString = data.headers.get('X-Pagination');
      this.pagination = <Pagination>JSON.parse(paginationString);
    });
  }

  getCommentariesFromUrl(url: string) {
    this.topicService.getCommentariesFromUrl(url).subscribe(data => {this.commentaries = data.body;
      const paginationString = data.headers.get('X-Pagination');
      this.pagination = <Pagination>JSON.parse(paginationString);
    });
  }

  createCommentaryForTopic() {
    this.commentary.topicId = this.id;
    this.topicService.createCommentary(this.id, this.commentary).subscribe(() => {
      this.refreshData();
      this.snackBar.open('Commentary has been created!', 'Thumbs up!', {
        duration: 3000
      });
    });
  }

  commentariesExist() {
    if (this.commentaries && this.commentaries.length > 0) {
      return true;
    }
    return false;
  }

  isDisabled(page: string) {
    if ( page !== null && page.length > 0) {
      return false;
    }
    return true;
  }

  refreshData() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.topicService.getCommentaries(this.id, 1, this.selected).subscribe(data => {this.commentaries = data.body;
      const paginationString = data.headers.get('X-Pagination');
      this.pagination = <Pagination>JSON.parse(paginationString);
    });
    this.topicService.getTopic(this.id).subscribe(data => this.topic = data);
  }
}
