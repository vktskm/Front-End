import { Injectable } from '@angular/core';
import { Post } from './Models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts:Post[] = [
    {
      "id":1,
      "title":"Lorem ipsum1",
      "active":true,
      type:'news'
    },
    {
      "id":2,
      "title":"Lorem ipsum2",
      "active":false,
      type:'education'
    },
    {
      "id":3,
      "title":"Lorem ipsum3",
      "active":false,
      type:'politic'
    },
    {
      "id":4,
      "title":"Lorem ipsum4",
      "active":true,
      type:'news'
    }
  ];

  constructor() { }

  getPosts():Post[] {
      return this.posts;
  }

  getPostByStatus(status:boolean):Post[]{
    return this.posts.filter(p => p.active == status);
  }

  toggleStatus(post:Post):void{
    post.active = !post.active;

    let index = this.posts.findIndex(p => p.id == post.id);
    this.posts.splice(index,1,post);
  }


}
