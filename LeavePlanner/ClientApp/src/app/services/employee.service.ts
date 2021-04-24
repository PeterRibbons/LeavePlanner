import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl: string) {

  }

   getAll():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl + 'api/employee');
  }
}

export interface Employee {
  EmployeeId: string,
  Name: string
}