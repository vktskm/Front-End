import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrls: ['./inactive-posts.component.scss']
})
export class InactivePostsComponent implements OnInit {

  postArray: Post[] = [];

  constructor(private postSvc:PostService){}

  ngOnInit(): void {

      this.postArray = this.postSvc.getPostByStatus(false);

  }

  toggleStatus(post: Post): void {
    this.postSvc.toggleStatus(post);
    this.postArray = this.postSvc.getPostByStatus(false);
  }

}
