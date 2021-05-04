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
    ReturnDate:[, { validators: [Validators.required], updateOn: "change" }],
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
       const returnDate = group.controls['ReturnDate'];
       const numberofdays = group.controls['NumberOfDays'];
       if (startDate.value > endDate.value) {
          endDate.setErrors({notEquivalent: true});
       } else {
          endDate.setErrors(null);         
       }
       if (returnDate.value < endDate.value) {
        returnDate.setErrors({notEquivalent: true});
     } else {
        returnDate.setErrors(null);
     }

       return;
  };

  
}

calculateNumDays()
{
  const startDate = this.leaveForm.controls['StartDate'].value;
  const endDate = this.leaveForm.controls['EndDate'].value;
  var numDays=this.getWeekdayCount(startDate,endDate);
  this.leaveForm.controls["NumberOfDays"].setValue(numDays);
}

getWeekdayCount(startDate, endDate) {
  if (startDate==null || endDate==null){
    return 0;
  }
  if (startDate>endDate) {
    return 0
  }
    
  var count = 0;
  var curDate = startDate;
  while (curDate <= endDate) {
      var dayOfWeek = curDate.getDay();
      if(!((dayOfWeek == 6) || (dayOfWeek == 0)))
         count++;
      curDate.setDate(curDate.getDate() + 1);
  }

  return count;
}

}
