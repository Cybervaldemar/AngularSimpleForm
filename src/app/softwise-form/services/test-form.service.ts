import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SoftwiseResponse {
  success: boolean;
  data?: Array<{date: string, name: string}>;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class TestFormService {

  private BASE_PATH: string = '/api';
  private serverResponseSubject: BehaviorSubject<SoftwiseResponse> = new BehaviorSubject<SoftwiseResponse>({ success: false });

  public serverResponse$ = this.serverResponseSubject.asObservable();

  constructor(private http: HttpClient) { }

  public sendForm(
    firstName: string,
    lastName: string,
    date: Date
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
    });

    return this.http.post(this.BASE_PATH, { first_name: firstName, last_name: lastName, date: date.toString()}, { headers: httpHeaders });
  }

  public setState(serverResponse: SoftwiseResponse) {
    this.serverResponseSubject.next(serverResponse);
  }

}
