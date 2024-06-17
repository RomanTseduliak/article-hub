import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleState } from 'src/app/interfaces/content.interfaces';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  article = {} as Article;
  article$: Observable<Article | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ articles: ArticleState }>
  ) {
    const articleId = this.route.snapshot.paramMap.get('id');
    this.article$ = this.store
      .select((state) => state.articles.articles)
      .pipe(
        map((articles) =>
          articles.find((article) => article.id === +articleId!)
        )
      );
  }

  ngOnInit(): void {}
}
