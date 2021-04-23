using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository;
using Data.Models;

namespace LeavePlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private EmployeeRepository repository=new Repository.EmployeeRepository();
        public List<Employee> Index()
        {
            return repository.GetEmployees();
        }
    }
}
