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
  departments: String[]=[];
  selectedDepatment:string;
  userRoles: String[]=[];
  usn:String = "";
  empID:string="";
  email:any ="";
  faculties : any;
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
    this.userRoles = user.roles;
    this.email = user.user
    this.AnalyticsService.get_academic_years().subscribe(res=>{
      this.academic = res["year"];
      
    })
    this.AnalyticsService.get_semesters().subscribe(res=>{
      this.semester = res["semesters"];
    })
    if(this.userRoles.includes("STUDENT")){
      this.AnalyticsService.get_usn_by_email(this.email).subscribe(res=>{
        this.usn = res["usn"];
        console.log(this.usn)
      })
    }else{
      this.AnalyticsService.get_empid(this.email).subscribe(res=>{
        this.empID = res["empid"];
        console.log("EMPID",this.empID)
      })
    }
    if(this.userRoles.includes("PRINCIPAL")){
      this.AnalyticsService.get_depts().subscribe(res=>{
        this.departments = res["depts"]
      })
    }
  }
  onSearch(event)
  {
    
    if(this.userRoles.includes("STUDENT")){
      if(!this.isPlacementOn){
        this.getPlacementDetails()
      }
      this.generateStudentGraph()
    }
    else if(this.userRoles.includes("PRINCIPAL")){
      this.AnalyticsService.get_dept_faculties(this.selectedDepatment).subscribe(res=>{
        let f = res["faculties"]
        console.log(f)
        let data = []
        for(let a of f){
          data.push(a)
        }
        this.faculties = data
      })
      console.log(this.faculties)
    }
    else if(this.userRoles.includes("HOD")){
      //see the department and get emps
      let str = this.empID;
      let patt = new RegExp("[a-zA-Z]*");
      let res = patt.exec(str);
      this.selectedDepatment = res[0];
      this.AnalyticsService.get_dept_faculties(this.selectedDepatment).subscribe(res=>{
        let f = res["faculties"]
        let data = []
        for(let a of f){
          data.push(a)
        }
        this.faculties = data
      })
      console.log(this.faculties)
    }
    else if(this.userRoles.includes("FACULTY")){
      //just load his data
      this.getEmpChart(this.empID)
    }
    
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
  generateStudentGraph(){
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
  getEmpChart(empid){
    //get emp subject with marks with year,sem,empid
    this.AnalyticsService.get_emp_subjects(empid,this.SelectedYear,this.SelectedSem).subscribe(res=>{
      let d = res["iamarks"]
      let data = [["Subject Name","%IA score","%Placement"]]
      for (let sub of d){
        let temp;
        //console.log(sub)
        this.AnalyticsService.get_emp_placement_of_sub(empid,this.SelectedSem,sub["courseName"]).subscribe(deet=>{
         temp = 100 * deet["placedStudents"] / deet["totalStudents"] 
        })
        
        data.push([d["courseName"],d[""]])
      }
    })
  }


  graph_data(data) {
    this.showSpinner = true
    this.title = 'Course-wise Internal Marks %',
      this.firstLevelChart = {
        chartType: "ComboChart",
        dataTable: data,
        options: {
          focusTarget:'datum',
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
    if(event.selectedRowValues[0]){
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
}
