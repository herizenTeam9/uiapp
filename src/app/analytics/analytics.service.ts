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
  get_ia_marks_per_subject(term,usn,sem,subject): Observable<any>{
    let ur = `${this.url}internals/${term}/${usn}/${sem}/${subject}`
    return this.http.get(ur)
  }
  get_empid(email): Observable<any>{
    let ur = `${this.url}empid/${email}`
    return this.http.get(ur)
  }
  get_depts(): Observable<any>{
    let ur = `${this.url}depts`
    return this.http.get(ur)
  }
  get_dept_faculties(dept): Observable<any>{
    let ur = `${this.url}emps/${dept}`
    return this.http.get(ur)
  }
  get_emp_subjects(empid,term,sem): Observable<any>{
    let ur = `${this.url}emp/ia/total/${empid}/${term}/${sem}`
    return this.http.get(ur)
  }
  get_emp_placement_of_sub(empid,sem,sub): Observable<any>{
    let ur = `${this.url}emp/placement/${empid}/${sem}/${sub}`
    return this.http.get(ur)
  }
}
