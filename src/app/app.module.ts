import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './movies/movie/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './movies/movie/movie.component';
import { NgxSplideModule } from 'ngx-splide';
@NgModule({
  declarations: [AppComponent, NavbarComponent, MovieComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxSplideModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
