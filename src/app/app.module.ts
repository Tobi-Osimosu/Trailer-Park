import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';
import { UpcomingMoviesComponent } from './upcoming-movies/upcoming-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TrendingMoviesComponent,
    UpcomingMoviesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SwiperModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
