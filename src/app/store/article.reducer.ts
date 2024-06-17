import { createReducer, on } from '@ngrx/store';
import {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
} from './article.actions';
import { ArticleState, ArticleStatus } from '../interfaces/content.interfaces';

export const initialState: ArticleState = {
  articles: [],
  error: null,
  status: ArticleStatus.Pending,
};

export const articleReducer = createReducer(
  initialState,
  on(loadArticles, (state) => ({ ...state, status: ArticleStatus.Loading })),
  on(loadArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles,
    status: ArticleStatus.Success,
  })),
  on(loadArticlesFailure, (state, { error }) => ({
    ...state,
    error,
    status: ArticleStatus.Error,
  }))
);
