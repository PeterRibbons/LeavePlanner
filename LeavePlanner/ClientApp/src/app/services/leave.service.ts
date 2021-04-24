import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

  
export class LeaveService {
    constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl: string) {
   }

   post(leave:Leave)
   {
      this.http.post(this.baseUrl+"api/leave/post",leave);
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
