import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  employees:any[];
  //selectedRadioButton:string='All';
  constructor() { 
    this.employees=[
      {id:1,name:'Aadya',gender:'female'},
      {id:2,name:'Ved',gender:'male'},
      {id:3,name:'Karun',gender:'male'},
      {id:4,name:'Sriveena',gender:'female'},
      {id:5,name:'Divi',gender:'female'},
      {id:6,name:'Vinny',gender:'female'}
    ]
  }
  //onEmployeeRadioButtonChange(selectedButton:string):void{
   // this.selectedRadioButton=selectedButton;
  //}
  getTotalcount():number{
    return this.employees.length
  }
  getTotalMalecount():number{
    return this.employees.filter(e=> e.gender==='male').length
  }
  getTotalFemalecount():number{
    return this.employees.filter(e=> e.gender==='female').length
  }
  ngOnInit(): void {
  }

}
