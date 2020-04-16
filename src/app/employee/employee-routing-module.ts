import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeesComponent} from './list-employees.component';
import {CreateEmployeeComponent} from './create-employee.component';
import { ParentComponent } from '../parent/parent.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

const routes: Routes = [
   // {
     //   path: 'employees', children: [ //commented because of lazyload
            { path: '', component: ListEmployeesComponent },
            { path: 'create', component: CreateEmployeeComponent },
            { path: 'parent', component: ParentComponent },
            { path: 'edit/:id', component: CreateEmployeeComponent },
     //   ]
  //  }

];
 
@NgModule({
  imports: [RouterModule.forChild(routes),
ReactiveFormsModule,FormsModule],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
