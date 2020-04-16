import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing-module';
import { ParentComponent } from '../parent/parent.component';
import {ListEmployeesComponent} from './list-employees.component';
import {CreateEmployeeComponent} from './create-employee.component';
import { ChildComponent } from '../child/child.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports:[
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        EmployeeRoutingModule
    ],
    declarations:[
      ParentComponent,
        ChildComponent ,
        ListEmployeesComponent,
        CreateEmployeeComponent
    ],
   
   
})
export class EmployeeModule { }