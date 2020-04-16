import { Component, OnInit } from '@angular/core';
import { SharingserviceService } from '../sharingservice.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl,FormArray } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { employeeService } from './employee.service';
import {IEmployee} from './IEmployee';
import {ISkill} from './ISkill';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee:IEmployee;
  PageTitle:string;
  constructor(private fb: FormBuilder,private router:Router, private route:ActivatedRoute, private _employeeService:employeeService) { }
  validationMessages = {
    'fullName': {
      'required': 'Fullname required',
      'minlength': 'minimum 2 characters',
      'maxlength': 'maximum 10 characters'
    },
    'email': {
      'required': 'email required'
    },
    'conformEmail':{
      'required':'conform email required'
    },
    'emailGroup':{
      'emailMismatch':'email and conform email should match'
    },
    'phone': {
      'required': 'phoneNo. required'
    },
    // 'skillName': {
    //   'required': 'skillName required'
    // },
    // 'experiance': {
    //   'required': 'experiance required'
    // },
    // 'Proficiency': {
    //   'required': 'Proficiency required'
    // }
  }
  formErrors = {
    'fullName': '',
    'email': '',
    'conformEmail':'',
    'emailGroup':'',
    'phone': '',
    // 'skillName': '', commented because we added in  setExistingSkills Form Arraygg
    // 'experiance': '',
    // 'Proficiency': ''
  };
  employeeForm: FormGroup;
  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', Validators.required],
        conformEmail: ['', Validators.required],
      },{validator:matchEmail}),
      
      phone: [''],
      skills: this.fb.array([
        this.addSkillformGroup()
      ])
       
    })
    //IT check for value changes in employeeForm
    this.employeeForm.valueChanges.subscribe(data => {
      this.logValidationErrors(this.employeeForm);
    })
    //Check for value changes in contactpreferences
    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    })
    //Reading ID parameter using ActivatedRoute
    this.route.paramMap.subscribe(
      (params) => {
        const empId = +params.get('id')
        if (empId) {          
      this.PageTitle="Edit Employee";
          this.getEmployee(empId)
        }
        else{          
      this.PageTitle="Create Employee";
          this.employee={
            id:null,
            fullName:'',
            contactPreference:'',
            email:'',
            phone:null,
            skills:[]
          }
        }
      }
    )
  }

  getEmployee(id:number){
    this._employeeService.getEmployee(id).subscribe(
      (employee:IEmployee)=>{
        this.editEmployee(employee)
        this.employee=employee},//to put method
      (err:any)=> console.log(err)
    )
  }

  editEmployee(employee:IEmployee){
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference:employee.contactPreference,
      emailGroup:{
        email:employee.email,
        conformEmail:employee.email
      },
      phone:employee.phone
    });
    //setControl for to set FormArray
    this.employeeForm.setControl('skills',this.setExistingSkills(employee.skills));
  }
  setExistingSkills(skillsets: ISkill[]): FormArray {
    const formarray = new FormArray([]);
    skillsets.forEach(s => {
      formarray.push(this.fb.group({
        skillName: s.skillName,
        experiance: s.experiance,
        Proficiency: s.Proficiency
      }))
    })
    return formarray;
  }
  removeSkill(skillGroupIndex:number){
    const skillsFormArray=<FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }
  addSkillButtonClick():void{
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillformGroup());
  }
  
  //to add skills using FormArray
  addSkillformGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experiance: ['', Validators.required],
      Proficiency: ['', Validators.required]
    })
  }
  
  // to add phone preference 
  onContactPreferenceChange(selectedValue: string) {
    const phonecontrol = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phonecontrol.setValidators(Validators.required);
      this.employeeForm.get('emailGroup').disable();
      
    }
    else {
      this.employeeForm.get('emailGroup').enable();
      
      phonecontrol.clearValidators();
    }
    phonecontrol.updateValueAndValidity();
  }
//to load errors
  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.dirty || abstractControl.touched)) {
          const messages = this.validationMessages[key];
          for (let errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }

        }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);

      } 
      // if (abstractControl instanceof FormArray) {
      //   for(const control of abstractControl.controls){
      //     if(control instanceof FormGroup){
      //       this.logValidationErrors(control);
      //     }
      //   }
      // } 
    })

  }
  onclickLoad(): void {
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors)
  }
  onsubmit() {
    this.mapFormValuestoEmployeeModel();
    if (this.employee.id) {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () =>
          this.router.navigate(['employees']),
        (err) => console.log(err)
      )
    }
    else {
      this._employeeService.addEmployee(this.employee).subscribe(
        () =>
          this.router.navigate(['employees']),
        (err) => console.log(err)
      )
    }
  } 
  mapFormValuestoEmployeeModel(){
    this.employee.fullName= this.employeeForm.value.fullName;
    this.employee.contactPreference= this.employeeForm.value.contactPreference;
    this.employee.email= this.employeeForm.value.emailGroup.email;
    this.employee.phone= this.employeeForm.value.phone;
    this.employee.skills= this.employeeForm.value.skills;    
  }
}
// Custom Validation  to check email and conform email are same
function matchEmail(group:AbstractControl):{[key:string]:any}|null {
  const emailControl= group.get('email');
  const conformEmailControl= group.get('conformEmail');
  if(emailControl.value === conformEmailControl.value || (conformEmailControl.pristine && conformEmailControl.value === '')){
    return null;
  }
  else {
  return {'emailMismatch':true}
  }    
}
/*Name:string;
  valuefromChild:string;
  employees=["a","b","c"];

  /*selectemp(emp:string){
    this.Name= emp;
  }
  fromchild(selected:string){
    if(selected){
      this.valuefromChild= selected;

    }

  }
 sharingex(){
   this._SharingserviceService.senddata('good Morning');
 }
 sharingex2(){
  this._SharingserviceService.senddata('How are you');*/
