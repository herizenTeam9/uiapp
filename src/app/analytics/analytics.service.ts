import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  url = environment.baseUrl;
  constructor(private http: HttpClient) { }

  get_academic_years():Observable<any>{
    let ur = `${this.url}academicyear`;
    return this.http.get(ur);
}
  get_semesters():Observable<any>{
    let ur = `${this.url}semesters`;
    return this.http.get(ur);
  }
  get_usn_by_email(email):Observable<any>{
    let ur = `${this.url}usn/${email}`;
    return this.http.get(ur);
  }
  get_offer_by_usn(term,usn):Observable<any>{
    let ur = `${this.url}placement/${term}/${usn}`;
    return this.http.get(ur);
  }
  get_all_ia_marks(term,usn,sem): Observable<any>{
    let ur = `${this.url}internals/total/${term}/${usn}/${sem}`
    return this.http.get(ur)
  }
}
