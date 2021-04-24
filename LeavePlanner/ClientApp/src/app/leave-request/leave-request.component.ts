import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {EmployeeService,Employee} from "../services/employee.service";
import {LeaveService} from "../services/leave.service";
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

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
    Comments: [''],
  });


  constructor(private employeeService: EmployeeService, private leaveService:LeaveService, private formBuilder: FormBuilder) { 

  }

  ngOnInit() {

    this.employees$=this.employeeService.getAll();
  }

  onSubmit()
  {
    this.leaveService.post(this.leaveForm.value);  }
}
