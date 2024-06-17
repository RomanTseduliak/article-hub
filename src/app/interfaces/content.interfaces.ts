export interface DefaultContent {
  count: number;
  next: string;
  previous: string | null;
  results: Article[];
}
export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
}


export enum ArticleStatus {
  Pending = 'pending',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}
export interface ArticleState {
  articles: Article[];
  error: string | null;
  status: ArticleStatus;
}
