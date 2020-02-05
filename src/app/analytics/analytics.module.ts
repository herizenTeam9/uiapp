import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { Statement3Component } from './statement3/statement3.component';
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { from } from 'rxjs';

@NgModule({
  declarations: [AnalyticsComponent, Statement3Component],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    MatSelectModule,
    FormsModule,
    MatCardModule
  ]
})
export class AnalyticsModule { }
