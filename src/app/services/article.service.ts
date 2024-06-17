import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article, DefaultContent } from '../interfaces/content.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private serviceUrl =
    'https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=100';
  public defaultContent: DefaultContent[] = [];
  isLoading = new BehaviorSubject(false);

  articles$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  constructor(private http: HttpClient) {}

  getData(): Observable<DefaultContent> {
    return this.http.get<DefaultContent>(`${this.serviceUrl}`);
  }
}
