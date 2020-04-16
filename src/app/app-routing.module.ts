import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { EmployeeModule } from './employee/employee.module';



const routes: Routes = [
  {path:'Home', component: HomeComponent},
  {path:'', redirectTo:'/Home' ,pathMatch:'full'},
  {path:'employees', loadChildren:()=>import('./employee/employee.module').then(m=>m.EmployeeModule)},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
