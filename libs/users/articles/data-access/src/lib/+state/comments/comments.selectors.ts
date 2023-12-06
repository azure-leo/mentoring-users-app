import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsState, commentsAdapter, commentsFeature } from './comments.reducer';
import {selectUsersEntities} from "@users/users/data-access";

export const { selectCommentsState, selectIds, selectStatus } = commentsFeature

const { selectAll, selectEntities } = commentsAdapter.getSelectors();

export const selectComments = createSelector(
  selectCommentsState,
  (state: CommentsState) => selectAll(state)
)

export const selectCommentsEntities = createSelector(
  selectCommentsState,
  (state: CommentsState) => selectEntities(state)
);

export const selectCommentById = (id: number) => createSelector(
    selectCommentsEntities,
    (entities) => entities[id]
)
