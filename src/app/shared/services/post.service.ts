import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  // Création d'un behavior subject (voir rxjs https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject)
  private postSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(<Post[]>[]);
  // Création d'un observable à partir du behavior subject
  usersObs: Observable<Post[]> = this.postSubject.asObservable();

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.typicode_url}/posts`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.typicode_url}/posts`, post);
  }

  refreshPosts(): void {
    this.http.get<Post[]>(`${environment.typicode_url}/posts`)
      .subscribe((posts:Post[])=>{
        // Changement de la valeur portée par le subject
        this.postSubject.next(posts);
        // Tous ce qui subscribe à userObs sera notifié et recevra la valeur du behavior subject
      })
  }
}
