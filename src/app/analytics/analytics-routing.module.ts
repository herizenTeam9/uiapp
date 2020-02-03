import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { Statement3Component } from './statement3/statement3.component';


const routes: Routes = [
  {
      path:"",
      redirectTo:'/analytics',
      pathMatch:'full'
  },
  {
      path:"",
      component:AnalyticsComponent,
      children:[
        {
          path:'statement3',
          component:Statement3Component
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
