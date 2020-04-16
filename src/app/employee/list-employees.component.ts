import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharingserviceService } from '../sharingservice.service'
import { ObserveService } from '../observe.service';
import { employeeService } from './employee.service';
import { IEmployee} from './IEmployee';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees:IEmployee[];

 constructor(private empService:employeeService, private router: Router){}

  ngOnInit() {
    this.empService.getEmployees().subscribe(
      (listemployees) =>
        this.employees = listemployees,
      (err) => console.log(err)
    )
  }
  EditFormData(employeeId:number){
    this.router.navigate(['/employees/edit', employeeId])
  }
}

















  /*
  // constructor(private _SharingserviceService: SharingserviceService, private _os: ObserveService) { }@Input()
    name:string;
  @Output() outputvalue=new EventEmitter<string>()
   notify(sel:string){
     this.outputvalue.emit(sel);
   }

  employees: any;
  ngOnInit() {
    this._os.observe().subscribe((data) => this.employees = data)
    this._SharingserviceService.share$
    .subscribe(
      message=>{
      if(message ==='good Morning'){
        alert("Good Morning1");
      }
      else if(message ==='How are you'){
       
         alert("Fine");
      }
     }
    )
     }*/
  
