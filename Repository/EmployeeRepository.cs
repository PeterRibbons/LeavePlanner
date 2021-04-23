using System;
using System.Collections.Generic;
using Data.Models;
using System.Linq;

namespace Repository
{
    public class EmployeeRepository
    {
        private LeavePlannerContext context = new LeavePlannerContext();
        public List<Employee> GetEmployees()
        {
            var employees = from employee in context.Employees select employee;
            return employees.ToList();
        }
    }


}
