import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  constructor() { }
  @Input()
  all:number;
  @Input()
  male:number;
  @Input()
  female:number;


 /*selectedRadioButton:string='All';
 @Output()
 countSelectionchangedRadioButton:EventEmitter<string>= new EventEmitter<string>();
 onRadioButtonSelectionChange(){
   this.countSelectionchangedRadioButton.emit(this.selectedRadioButton);
 }*/
 

}
