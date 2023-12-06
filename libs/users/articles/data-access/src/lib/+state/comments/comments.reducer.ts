import { createFeature, createReducer, on } from '@ngrx/store';
import { CommentsActions } from './comments.actions';
import { LoadingStatus } from '@users/core/data-access';
import { Comment } from '../../models/user-comment.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {map} from "rxjs";
import {inject} from "@angular/core";
import {AuthFacade} from "@auth/data-access";

export const commentsFeatureKey = 'comments';

export interface CommentsState extends EntityState<Comment> {
  status: LoadingStatus
  publishStatus: LoadingStatus
}

export const commentsAdapter: EntityAdapter<Comment> =
  createEntityAdapter<Comment>({
    sortComparer: (a, b) => {
      return Number(b.created_at) - Number(a.created_at)
    }
  });

export const initialCommentsState: CommentsState = commentsAdapter.getInitialState({
  status: 'init',
  publishStatus: 'init'
})

export const commentsFeature = createFeature({
  name: 'comments',
  reducer: createReducer(
    initialCommentsState,

    on(CommentsActions.loadComments, (state) => ({
      ...state,
      status: 'loading' as const
    })),

    on(CommentsActions.loadCommentsSuccess, (state, { comments }) =>
      commentsAdapter.setAll(comments, { ...state, status: 'loaded' as const })
    ),

    on(CommentsActions.loadCommentsFailed, (state) => ({
      ...state,
      status: 'error' as const
    })),

    on(CommentsActions.publishComment, (state) => ({
      ...state,
      publishStatus: 'loading' as const
    })),

    on(CommentsActions.publishCommentSuccess, (state, { comment }) =>
      commentsAdapter.addOne(comment, { ...state, publishStatus: 'loaded' as const })
    ),

    on(CommentsActions.publishCommentFailed, (state) => ({
      ...state,
      publishStatus: 'error' as const
    })),

    on(CommentsActions.deleteComment, (state, { id }) =>
      commentsAdapter.removeOne(id, state)
    ),

    on(CommentsActions.likeComment, (state, {comment, userId}) =>
      commentsAdapter.updateOne({id: comment.id,
        changes: {like_user_ids: [...comment.like_user_ids, userId]} as Partial<Comment>}, state)
    ),

    on(CommentsActions.likeCommentSuccess, (state, { comment }) =>
      commentsAdapter.updateOne({id: comment.id, changes: {like_user_ids: comment.like_user_ids} as Partial<Comment>}, state)
    ),

    on(CommentsActions.unlikeComment, (state, {comment, userId}) =>
      commentsAdapter.updateOne({id: comment.id, changes: {like_user_ids: [...comment.like_user_ids.filter(el => el != userId)]} as Partial<Comment>}, state)
    ),

    on(CommentsActions.unlikeCommentSuccess, (state, { comment }) =>
      commentsAdapter.updateOne({id: comment.id, changes: {like_user_ids: comment.like_user_ids} as Partial<Comment>}, state)
    ),

    on(CommentsActions.disLikeComment, (state, {comment, userId}) =>
      commentsAdapter.updateOne({id: comment.id,
        changes: {dislike_user_ids: [...comment.dislike_user_ids, userId]} as Partial<Comment>}, state)
    ),

    on(CommentsActions.disLikeCommentSuccess, (state, { comment }) =>
      commentsAdapter.updateOne({id: comment.id, changes: {dislike_user_ids: comment.dislike_user_ids} as Partial<Comment>}, state)
    ),

    on(CommentsActions.unDisLikeComment, (state, {comment, userId}) =>
      commentsAdapter.updateOne({id: comment.id, changes: {dislike_user_ids: [...comment.dislike_user_ids.filter(el => el != userId)]} as Partial<Comment>}, state)
    ),

    on(CommentsActions.unDisLikeCommentSuccess, (state, { comment }) =>
      commentsAdapter.updateOne({id: comment.id, changes: {dislike_user_ids: comment.dislike_user_ids} as Partial<Comment>}, state)
    ),
  )
});

