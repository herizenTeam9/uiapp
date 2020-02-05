import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './../analytics.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-statement3',
  templateUrl: './statement3.component.html',
  styleUrls: ['./statement3.component.css']
})
export class Statement3Component implements OnInit {
  academic:String[] = [];
  semester:String[] = [];
  usn:String = "";
  email:any ="";
  event:any;
  offers:any[] = [];
  SelectedYear;
  SelectedSem;
  attendence:any[];
  constructor(private AnalyticsService: AnalyticsService) { }
  
  ngOnInit() {
    this.email = localStorage.getItem("user");
    let user = JSON.parse(this.email)
    this.AnalyticsService.get_academic_years().subscribe(res=>{
      this.academic = res["year"];
      
    })
    this.AnalyticsService.get_semesters().subscribe(res=>{
      this.semester = res["semesters"];
      
    })
    this.AnalyticsService.get_usn_by_email(user.user).subscribe(res=>{
      this.usn = res["usn"];
    })
    this.SelectedSem = this.semester[0]
    this.SelectedYear = this.academic[0]
  }
  //9446297059
  
  onSearch(event)
  {
    this.event = event;
    console.log(this.SelectedYear,this.SelectedSem); 
    // this.AnalyticsService.get_offer_by_usn(this.SelectedYear ,this.usn).subscribe(res=>{
    //     let re = res["offers"];
    //     for(let r of re)
    //     {
    //       this.offers.push([r['companyName'],r['salary']])
    //     }
    // })

    // this.AnalyticsService.get_attendence_for_student(this.SelectedYear,this.usn,this.SelectedSem).subscribe(res=>{
    //   console.log(res);
    //   let re = res["attendence"];
    //   for(let r of re){
    //     this.attendence.push([r['absent'],r['courseCode'],r['courseName'],r['percentage'],r['present'],r['total_classes']])
    //   }
    //   console.log("done",this.attendence);

    // })
  }
}
