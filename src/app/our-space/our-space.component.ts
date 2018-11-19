import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OurSpaceService } from './our-space.service';
import { Topic } from './topic';
import { Pagination } from '../shared/pagination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-our-space',
  templateUrl: './our-space.component.html',
  styleUrls: ['./our-space.component.scss']
})
export class OurSpaceComponent implements OnInit {

  topic: Topic;
  topics: Topic[];
  topicUrl: string;
  pagination: Pagination;
  selected = 8;
  searchTitle = '';
  pageStyle = 'list';

  constructor(private ourSpaceService: OurSpaceService, private snackBar: MatSnackBar) {
    this.topic = {title: '', description: ''};
    this.pagination = {totalCount: 0, pageSize: 0, currentPage: 0, totalPages: 0, previousPage: '', nextPage: ''};
   }

  ngOnInit() {
    this.refreshData();
  }

  getTopics() {
    this.ourSpaceService.getTopics(1, this.selected).subscribe(data => {
      this.topics = data.body;
      const paginationString = data.headers.get('X-Pagination');
      this.pagination = <Pagination>JSON.parse(paginationString);
    });
  }

  getTopicsFromUrl(url: string) {
    this.ourSpaceService.getTopicsFromUrl(url).subscribe(data => {this.topics = data.body;
      const paginationString = data.headers.get('X-Pagination');
      this.pagination = <Pagination>JSON.parse(paginationString);
    });
  }

  searchByTitle() {
    this.ourSpaceService.getTopicsBySearch(1, this.selected, this.searchTitle).subscribe(data => {this.topics = data.body;
      const paginationString = data.headers.get('X-Pagination');
      this.pagination = <Pagination>JSON.parse(paginationString);
    });
  }

  createTopic() {
    this.ourSpaceService.createTopic(this.topic).subscribe(data => {
      this.refreshData();
      this.snackBar.open('Topic has been created!', 'Thumbs up!', {
        duration: 3000
      });
    });
  }

  deleteTopic(id: string) {
    this.ourSpaceService.deleteTopic(id).subscribe(data => location.reload());
  }

  isDisabled(page: string) {
    if ( page !== null && page.length > 0) {
      return false;
    }
    return true;
  }

  pageStyleBehaviour() {
    if (this.pageStyle === 'grid') {
      return true;
    }
    if (this.pageStyle === 'list') {
      return false;
    }
    return true;
  }

refreshData() {
  this.ourSpaceService.getTopics(1, this.selected).subscribe(data => {
    this.topics = data.body;
    const paginationString = data.headers.get('X-Pagination');
    this.pagination = <Pagination>JSON.parse(paginationString);
  });
}
}
