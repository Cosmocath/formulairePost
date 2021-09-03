import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../shared/services/post.service';
import { Post } from '../shared/models/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  formulaire: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.formulaire = this.fb.group({
      title: new FormControl(),
      body: new FormControl()

    })
  }

  ngOnInit(): void {
  }

  addPost(): void {
    if (this.formulaire.status === "VALID") {
      this.postService.addPost(this.formulaire.value).subscribe((newPost: Post) => {
        console.log(newPost);
        this.formulaire.reset();
      });
    }
    console.log(this.formulaire);
  }


}
