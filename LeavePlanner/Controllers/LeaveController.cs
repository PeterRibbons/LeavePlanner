using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;
using Repository;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LeavePlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private LeaveRepository leaveRepository = new LeaveRepository();
        // POST api/<LeaveController>
        [HttpPost]
        public void Post([FromBody] Leave leave)
        {
            leaveRepository.addLeave(leave);
        }

        
    }
}
