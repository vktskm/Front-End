export class Post {
  id:number;
  title:string;
  active:boolean;
  type:string;


  constructor(id:number, title:string, active:boolean, type:string){
    this.id = id;
    this.title = title;
    this.active = active;
    this.type = type;
  }

}
