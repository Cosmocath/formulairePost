import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../shared/models/post';
import { PostService } from '../shared/services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postSub?: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    })
    this.getPosts();
  }

  // destructeur du composant
  ngOnDestroy() {
    if (this.postSub) {
      // désinscription à l'opbservable (libération des ressources)
      this.postSub.unsubscribe();
    }
  }

  getPosts() {
    // this.userService.getUsers().subscribe((users:User[])=>{
    //   this.users = users;
    // })
    this.postService.refreshPosts();
  }

}
