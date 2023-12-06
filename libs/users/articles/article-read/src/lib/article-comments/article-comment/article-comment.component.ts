import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PushPipe } from '@ngrx/component';
import { LanguageSwitchService } from '../../../../../../core/ui/language-switch/src';
import { Comment } from '../../../../../data-access/src';
import {RouterLink} from "@angular/router";
import {CommentsFacade} from "../../../../../data-access/src/lib/+state/comments/comments.facade";
import {comment} from "postcss";
import {select, Store} from "@ngrx/store";
import {selectComments} from "../../../../../data-access/src/lib/+state/comments/comments.selectors";
import {map, Observable, take} from "rxjs";
import {AuthFacade} from "../../../../../../../core/auth/data-access/src";
import * as AuthSelectors from "../../../../../../../core/auth/data-access/src/lib/+state/auth.selectors";
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PushPipe,
    RouterLink,
  ],
  selector: 'article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent {
  public readonly store = inject(Store);
  public readonly comments$ = this.store.select(selectComments);

  private readonly languageService = inject(LanguageSwitchService);
  private readonly commentsFacade = inject(CommentsFacade);
  private readonly authFacade = inject(AuthFacade);

  @Input({ required: true }) comment!: Comment;
  @Input({required: true}) userId!: number;

  public readonly isCommentLiked$ =
    this.authFacade.user$.pipe(
      map((user) => {
        return this.comment.like_user_ids.indexOf(user.id) >= 0;
      })
    )

  public readonly isCommentDisLiked$ =
    this.authFacade.user$.pipe(
      map((user) => {
        return this.comment.dislike_user_ids.indexOf(user.id) >= 0;
      })
    )


  public onThumbUp() {
    this.authFacade.user$.pipe(
      take(1)
    ).subscribe((user) => {
      if (this.comment.like_user_ids.indexOf(user.id) >= 0) {
        this.commentsFacade.unlikeComment(this.comment, user.id)
      } else {
        this.isCommentDisLiked$.subscribe( (data) => {
          if (data) {
            this.commentsFacade.unDisLikeComment(this.comment, user.id)
          }
        })
        this.commentsFacade.likeComment(this.comment, user.id);
      }
    })
    }


  public onThumbDown() {
    this.authFacade.user$.pipe(
      take(1)
    ).subscribe((user) => {
      if (this.comment.dislike_user_ids.indexOf(user.id) >= 0) {
        this.commentsFacade.unDisLikeComment(this.comment, user.id)
      } else {
        this.isCommentLiked$.subscribe( (data) => {
          if (data) {
            this.commentsFacade.unlikeComment(this.comment, user.id)
          }
        })
        this.commentsFacade.disLikeComment(this.comment, user.id)
      }
    })
  }

  public get avatarSrc(): string {
    return this.comment.author.photo
      ? this.comment.author.photo.url
      : 'assets/img/1.png';
  }

}
