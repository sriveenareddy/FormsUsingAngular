import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
//import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
//import { EmployeeModule} from './employee/employee.module';
import { AppComponent } from './app.component';
//import { CreateEmployeeComponent } from './employee/create-employee.component';
//import { ListEmployeesComponent } from './employee/list-employees.component';


//import { ParentComponent } from './parent/parent.component';
//import { ChildComponent } from './child/child.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeRoutingModule } from './employee/employee-routing-module';

@NgModule({
  declarations: [
    AppComponent,
    //CreateEmployeeComponent,
    //ListEmployeesComponent,
    //ParentComponent,
   // ChildComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    EmployeeRoutingModule,// feature routing should be before AppRoutigModule
    AppRoutingModule,
    HttpClientModule,
    //ReactiveFormsModule,
    //FormsModule,
    //EmployeeModule //commenting for lazy load
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
