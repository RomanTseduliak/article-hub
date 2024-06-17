import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Article, ArticleState } from 'src/app/interfaces/content.interfaces';
import { loadArticles } from 'src/app/store/article.actions';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Output() public currentArticle = new EventEmitter<Article>();

  filteredArticlesCount = 0;
  articles$: Observable<Article[]> = this.store.select(
    (state) => state.articles.articles
  );
  filter$: BehaviorSubject<string> = new BehaviorSubject('');
  filteredArticles$: Observable<Article[]> = combineLatest([
    this.articles$,
    this.filter$.pipe(startWith('')),
  ]).pipe(
    map(([articles, filter]) => {
      if (!filter) {
        this.filteredArticlesCount = articles.length;
        this.cdRef.detectChanges();
        return articles;
      }
      const keywordsArray = filter
        .toLowerCase()
        .split(' ')
        .filter((keyword) => keyword);
      return articles
        .map((article) => ({
          ...article,
          namePriority: keywordsArray.some((keyword) =>
            article.title.toLowerCase().includes(keyword)
          ),
          descriptionPriority: keywordsArray.some((keyword) =>
            article.summary.toLowerCase().includes(keyword)
          ),
        }))
        .filter(
          (article) => article.namePriority || article.descriptionPriority
        )
        .sort((a, b) => (b.namePriority ? 1 : 0) - (a.namePriority ? 1 : 0));
    }),
    tap(
      (filteredArticles) =>
        (this.filteredArticlesCount = filteredArticles.length)
    )
  );

  constructor(
    private store: Store<{ articles: ArticleState }>,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadArticles());
  }

  onFilterChange(filter: any): void {
    this.filter$.next(filter.data);
  }

  highlight(text: string, keyword: string): string {
    if (!keyword) {
      return text;
    }
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  articleSelected() {
    this.currentArticle.emit();
  }
}
