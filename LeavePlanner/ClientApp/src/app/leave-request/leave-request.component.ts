import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {EmployeeService,Employee} from "../services/employee.service";
import {LeaveService} from "../services/leave.service";
import { Validators } from '@angular/forms';
import {FormBuilder,FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms'
import { AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  employees$ : Observable<Employee[]>;
  leaveForm= this.formBuilder.group({
    EmployeeId:[, { validators: [Validators.required], updateOn: "change" }],
    ManagerId: [, { validators: [Validators.required], updateOn: "change" }],
    StartDate: [, { validators: [Validators.required], updateOn: "change" }],
    EndDate: [, { validators: [Validators.required], updateOn: "change" }],
    NumberOfDays: [''],
    ReturnDate: [''],
    Comments: [, { validators: [Validators.maxLength(500)], updateOn: "change" }],
  }, { validators: [this.managerValidator(),this.dateRangeValidator()] });



  constructor(private employeeService: EmployeeService, private leaveService:LeaveService, private formBuilder: FormBuilder) { 

  }

  ngOnInit() {

    this.employees$=this.employeeService.getAll();
  }

  onSubmit()
  {
    this.leaveService.post(this.leaveForm.value);  
  }

 

  public managerValidator() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
       const control1 = group.controls['EmployeeId'];
       const control2 = group.controls['ManagerId'];
       if (control1.value === control2.value) {
          control2.setErrors({Equivalent: true});
       } else {
          control2.setErrors(null);
       }
       return;
   };
  }

  public dateRangeValidator() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
       const startDate = group.controls['StartDate'];
       const endDate = group.controls['EndDate'];
       if (startDate.value > endDate.value) {
          endDate.setErrors({notEquivalent: true});
       } else {
          endDate.setErrors(null);
       }
       return;
  };
}

}
