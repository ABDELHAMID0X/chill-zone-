import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpService } from 'src/service/httpService';
import { Carousel, initTE } from 'tw-elements';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('10 0ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MovieComponent implements OnInit {
  movie: any = [];
  popular?: any = [];
  divElement?: HTMLElement;
  index: any = 0;
  upcoming?: any;
  tvShow?: any;
  tvIndex: number = 0;
  TopMv?: any;
  topmvIndex: any = 4;
  lowmvIndex: any = 0;
  Anime?: any;
  maxAnimeIndex = 4;
  minAnimeIndex = 0;
  url: string = 'https://image.tmdb.org/t/p/original';
  ngOnInit(): void {
    this.elementRef.nativeElement.querySelector('#scroll').scrollLeft = 0;
    this.elementRef.nativeElement.querySelector('#scrollScreen').scrollLeft = 0;
    this.elementRef.nativeElement.querySelector('#scoole2').scrollLeft = 0;
    this.getMovie();
    this.getPopular();
    this.getUpcoming();
    this.getTopMv();
    this.getAnime();
    initTE({ Carousel });
    this.getTv();
    setInterval(() => {
      this.scrollScreen();
    }, 3000);
  }
  constructor(
    private httpClient: HttpClient,
    private http: HttpService,
    private elementRef: ElementRef
  ) {}

  getMovie() {
    let that = this;
    this.http
      .GetM(
        '/movie/now_playing?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=1'
      )
      .subscribe({
        next(value: any) {
          that.movie = value.results;
        },
        error(err) {},
        complete() {},
      });
  }

  getUpcoming() {
    let that = this;
    this.http
      .GetM(
        '/movie/upcoming?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=1'
      )
      .subscribe({
        next(value: any) {
          that.upcoming = value.results;
        },
        error(err) {},
        complete() {},
      });
  }

  getPopular() {
    let that = this;
    this.http
      .GetM(
        '/movie/popular?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=1'
      )
      .subscribe({
        next(value: any) {
          that.popular = value.results;
        },
        error(err) {},
        complete() {},
      });
  }

  getTv() {
    let that = this;
    this.http
      .GetM(
        '/tv/top_rated?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=1'
      )
      .subscribe({
        next(value: any) {
          that.tvShow = value.results;
        },
        error(err) {},
        complete() {},
      });
  }

  getTopMv() {
    let that = this;
    this.http
      .GetM(
        '/movie/top_rated?api_key=08399bf740a4d93d9e75e8a3a6917e88&language=en-US&page=1'
      )
      .subscribe({
        next(value: any) {
          that.TopMv = value.results;
        },
        error(err) {},
        complete() {},
      });
  }

  getAnime() {
    let that = this;
    this.httpClient.get('https://api.jikan.moe/v4/top/anime').subscribe({
      next(value: any) {
        that.Anime = value.data;
      },
      error(err) {},
      complete() {},
    });
  }

  nexAnime() {
    if (this.Anime.length > this.maxAnimeIndex) {
      this.maxAnimeIndex += 4;
      this.minAnimeIndex += 4;
    }
  }

  prevAnime() {
    if (this.minAnimeIndex >= 4) {
      this.maxAnimeIndex -= 4;
      this.minAnimeIndex -= 4;
    }
  }

  nexTopM() {
    if (this.TopMv.length > this.topmvIndex) {
      this.topmvIndex += 4;
      this.lowmvIndex += 4;
    }
  }

  prevTopM() {
    if (this.lowmvIndex >= 4) {
      this.topmvIndex -= 4;
      this.lowmvIndex -= 4;
    }
  }

  nexTv() {
    if (this.tvShow.length - 1 > this.tvIndex) {
      this.tvIndex++;
      // if (this.tvShow.length === this.tvIndex) {
      //   this.tvIndex = 0;
      // }
    }
  }

  prevTv() {
    if (this.tvIndex > 0) {
      this.tvIndex--;
    }
  }

  selectMovie(index: any) {
    this.divElement = this.elementRef.nativeElement.querySelector('#scoole2');
    if (this.divElement) {
      this.index = index;
      this.divElement.scrollLeft = this.index * 208;
    }
  }

  scrollDiv() {
    this.divElement = this.elementRef.nativeElement.querySelector('#scroll');
    if (this.divElement) {
      this.divElement.scrollLeft += 200;
    }
  }
  PrevDiv() {
    this.divElement = this.elementRef.nativeElement.querySelector('#scroll');
    if (this.divElement) {
      this.divElement.scrollLeft -= 208;
    }
  }

  scrollDiv2() {
    this.divElement = this.elementRef.nativeElement.querySelector('#scoole2');
    if (this.divElement) {
      this.divElement.scrollLeft += 208;
      if (this.index <= this.popular.length - 1) {
        this.index++;
      }
    }
  }

  PrevDiv2() {
    this.divElement = this.elementRef.nativeElement.querySelector('#scoole2');
    if (this.divElement) {
      this.divElement.scrollLeft -= 208;
      if (this.index > 0) {
        this.index--;
      }
    }
  }

  //

  scrollScreen() {
    this.divElement =
      this.elementRef.nativeElement.querySelector('#scrollScreen');
    if (this.divElement) {
      const scrollAmount = screen.width; // Adjust the scroll amount as per your requirements
      const maxScrollLeft =
        this.divElement.scrollWidth - this.divElement.clientWidth;
      this.divElement.scrollLeft += scrollAmount;
      if (this.divElement.scrollLeft >= maxScrollLeft) {
        this.divElement.scrollLeft = 0;
      }
    }
  }
}
