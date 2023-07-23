import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  private apiServerBase = environment.apiBaseServer;
  public GetM(endPoint: any) {
    return this.http.get(this.apiServerBase + endPoint);
  }
}
