import { createAction, props } from '@ngrx/store';
import { Article } from '../interfaces/content.interfaces';

export const loadArticles = createAction('[Article List] Load Articles');
export const loadArticlesSuccess = createAction(
  '[Article List] Load Articles Success',
  props<{ articles: Article[] }>()
);
export const loadArticlesFailure = createAction(
  '[Article List] Load Articles Failure',
  props<{ error: string }>()
);
