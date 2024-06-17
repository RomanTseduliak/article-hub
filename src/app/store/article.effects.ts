import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
} from './article.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ArticleService } from '../services/article.service';

@Injectable()
export class ArticleEffects {
  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticles),
      mergeMap(() =>
        this.articleService.getData().pipe(
          map((response) =>
            loadArticlesSuccess({ articles: response.results })
          ),
          catchError((error) =>
            of(loadArticlesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}
}
