import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';
@Component({
  selector: 'app-statement1',
  templateUrl: './statement1.component.html',
  styleUrls: ['./statement1.component.css']
})
export class Statement1Component implements OnInit {
  academic:String[] = [];
  semester:String[] = [];
  usn:String = "";
  email:any ="";
  event:any;
  offers:any[] = [];
  SelectedYear;
  SelectedSem;
  attendence:any[];
  chart_visibility: boolean;
  showSpinner: boolean;
  title: string;
  firstLevelChart : GoogleChartInterface
  error_flag : boolean = true 
  error_message = "Data not found"
  isPlacementOn = false;
  selectedSubject;
  markDetails:any[];
  closeResult: string;

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
      console.log(this.usn)
    })
  }
  
  onSearch(event)
  {
    if(!this.isPlacementOn){
      this.getPlacementDetails()
    }
    this.generateGraph()
    
  }
  getPlacementDetails(){
    this.AnalyticsService.get_offer_by_usn(this.SelectedYear ,this.usn).subscribe(res=>{
      let re = res["offers"];
      for(let r of re)
      {
        this.offers.push([r['companyName'],r['salary']])
      }
  })
  this.isPlacementOn = true
  }
  generateGraph(){
    this.AnalyticsService.get_all_ia_marks(this.SelectedYear,this.usn,this.SelectedSem).subscribe(res=>{
      let data = [["Subjects","%Marks"]]
      let marks = res["marks"]
      console.log(marks)
      for(let subject of marks){
        let per = 100 * subject["got"]/subject["max"];
        
        data.push([subject["courseName"],per])
      }
      this.graph_data(data)
    })
  }

  back_() {
    this.chart_visibility = false
  }
  graph_data(data) {
    this.showSpinner = true
    this.title = 'Course-wise Internal Marks %',
      this.firstLevelChart = {
        chartType: "ComboChart",
        dataTable: data,
        options: {
          bar: { groupWidth: "20%" },
          vAxis: {
            title: "Percentage",
          },

          height: 800,
          hAxis: {
            title: "Courses",
            titleTextStyle: {
            }
          },
          chartArea: {
            left: 80,
            right: 100,
            top: 100,
          },
          legend: {
            position: "top",
            alignment: "end"
          },
          seriesType: "bars",
          colors: ["#d3ad5d", "#789d96"],
          fontName: "Times New Roman",
          fontSize: 13,
        }

      }
  }
  second_level(event: ChartSelectEvent) {
    this.selectedSubject = event.selectedRowValues[0]
    this.AnalyticsService.get_ia_marks_per_subject(this.SelectedYear,this.usn,this.SelectedSem,this.selectedSubject).subscribe(res=>{
      let allMarks = res["marks"]
      let data = []
      for(let ia of allMarks){
        data.push([ia["iaNumber"],ia["outof"],ia["obtained"]])
      }
      this.markDetails=data
      console.log(this.markDetails)
    })
  }
}
