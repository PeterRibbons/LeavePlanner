import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

  
export class LeaveService {
    constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl: string) {
  
   }

   post(leave:Leave):void
   {
     var num:any;
     num=leave.NumberOfDays;
     leave.NumberOfDays=parseInt(num);
      this.http.post<Leave>(this.baseUrl+"api/leave",leave,{}).subscribe(result=>alert("success"));
   }
}

export interface Leave {
  EmployeeId : number;
  ManagerId : number;
  StartDate : Date;
  EndDate : Date;
  NumberOfDays : number;
  ReturnDate : Date;
  Comment: string;
}
