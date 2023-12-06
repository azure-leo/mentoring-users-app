import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Comment } from "../../models/user-comment.model";
import { CreateComment } from "../../models/create-comment.model";
import {UsersEntity} from "@users/core/data-access";

export const CommentsActions = createActionGroup({
  source: 'Comment',
  events: {
    publishComment: props<{ comment: CreateComment }>(),
    publishCommentSuccess: props<{ comment: Comment }>(),
    publishCommentFailed: props<{ error: Error }>(),
    loadComments: props<{ articleId: number }>(),
    loadCommentsSuccess: props<{comments: Comment[]}>(),
    loadCommentsFailed: props<{ error: Error }>(),
    deleteComment: props<{ id: number }>(),
    deleteCommentSuccess: props<{ id: number }>(),
    deleteCommentFailed: props<{ error: Error }>(),

    likeComment: props <{ comment: Comment; userId: number }>(),
    likeCommentSuccess: props<{ comment: Comment }>(),
    likeCommentFailed: props<{ error: Error }>(),

    unlikeComment: props <{ comment: Comment, userId: number }>(),
    unlikeCommentSuccess: props<{ comment: Comment }>(),
    unlikeCommentFailed: props<{ error: Error }>(),

    disLikeComment: props<{ comment: Comment, userId: number }>(),
    disLikeCommentSuccess: props<{ comment: Comment }>(),
    disLikeCommentFailed: props<{ error: Error }>(),

    unDisLikeComment: props <{ comment: Comment, userId: number }>(),
    unDisLikeCommentSuccess: props<{ comment: Comment }>(),
    unDisLikeCommentFailed: props<{ error: Error }>(),
  },
});
