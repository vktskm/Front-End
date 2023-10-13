import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-active-posts',
  templateUrl: './active-posts.component.html',
  styleUrls: ['./active-posts.component.scss']
})
export class ActivePostsComponent implements OnInit {

  postArray: Post[] = [];

  constructor(private postSvc:PostService){}

  ngOnInit(): void {

      this.postArray = this.postSvc.getPostByStatus(true);

  }

  toggleStatus(post: Post): void {
    this.postSvc.toggleStatus(post);
    this.postArray = this.postSvc.getPostByStatus(true);
  }

}
