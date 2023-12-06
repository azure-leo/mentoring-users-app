import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectComments, selectCommentsEntities } from "./comments.selectors";
import {map, Observable, of, switchMap} from "rxjs";
import { Comment } from "../../models/user-comment.model";
import {UsersFilter} from "../../../../../../users/data-access/src/lib/+state/users.types";
import * as UsersActions from "../../../../../../users/data-access/src/lib/+state/users.actions";
import {CommentsActions} from "@users/users/articles/data-access";
import * as UsersSelectors from "../../../../../../users/data-access/src/lib/+state/users.selectors";
import {UsersEntity} from "@users/core/data-access";
import * as CommentSelectors from './comments.selectors';
import {AuthFacade} from "@auth/data-access";
import * as AuthSelectors from '../../../../../../../core/auth/data-access/src/lib/+state/auth.selectors';

@Injectable({providedIn: 'root'})
export class CommentsFacade {
  private readonly store = inject(Store);
  public readonly articles$: Observable<Comment[]> = this.store.select(selectComments);
  public readonly articlesEntities$ = this.store.select(selectCommentsEntities);
  private readonly authFacade = inject(AuthFacade)

  getCommentFromStore(id: number) {
    return this.store.select(CommentSelectors.selectCommentById(id));
  }

  likeComment(comment: Comment, userId: number) {
    console.log('like was triggered')
    this.store.select(AuthSelectors.selectLoggedUserId).pipe(
      map((data) => {
        userId = data
      })
    )
    console.log('current id', userId)
    this.store.dispatch(CommentsActions.likeComment({comment, userId}));
  }

  unlikeComment(comment: Comment, userId: number) {
    console.log('unlike was triggered')
    this.store.dispatch(CommentsActions.unlikeComment({ comment, userId}));
  }

  disLikeComment(comment: Comment, userId: number) {
    console.log('dislike was triggered')
    this.store.select(AuthSelectors.selectLoggedUserId).pipe(
      map((data) => {
        userId = data
      })
    )
    console.log('current id', userId)
    this.store.dispatch(CommentsActions.disLikeComment({comment, userId}));
  }

  unDisLikeComment(comment: Comment, userId: number) {
    console.log('unlike was triggered')
    this.store.dispatch(CommentsActions.unDisLikeComment({comment, userId}));
  }
}
