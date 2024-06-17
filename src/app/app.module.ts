import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CardDetailComponent } from './card/card-detail/card-detail/card-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { articleReducer } from './store/article.reducer';
import { ArticleEffects } from './store/article.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ArticleService } from './services/article.service';
import { DateSuffixPipe } from './share/date-suffix.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    HomePageComponent,
    DateSuffixPipe,
    CardDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,

    StoreModule.forRoot({ articles: articleReducer }),
    EffectsModule.forRoot([ArticleEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    NoopAnimationsModule,
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/search-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'date',
      sanitizer.bypassSecurityTrustResourceUrl('assets/date-icon.svg')
    );
  }
}
