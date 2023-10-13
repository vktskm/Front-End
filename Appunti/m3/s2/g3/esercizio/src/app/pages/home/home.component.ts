import { Component } from '@angular/core';
import { Post } from 'src/app/Models/post';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  postArray: Post[] = [];

  constructor(private postSvc:PostService){}

  ngOnInit(): void {
      this.postArray = this.postSvc.getPosts();
  }

  toggleStatus(post: Post): void {
    this.postSvc.toggleStatus(post);
    this.postArray = this.postSvc.getPosts();
  }

  changeColor(type:string):string{

    let color = '';

    color = type == 'news' ? 'yellow' : '';
    color = type == 'politics' ? 'black' : '';
    color = type == 'education' ? 'blue' : '';

    return color;
}
}
