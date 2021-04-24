import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {EmployeeService,Employee} from "../services/employee.service";
import {LeaveService} from "../services/leave.service";

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  employees$ : Observable<Employee[]>;
  constructor(private employeeService: EmployeeService, private leaveService:LeaveService) { }

  ngOnInit() {

    this.employees$=this.employeeService.getAll();
  }

}
