using System;
using System.Collections.Generic;

#nullable disable

namespace Data.Models
{
    public partial class Leave
    {
        public int LeaveId { get; set; }
        public int EmployeeId { get; set; }
        public int ManagerId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Comments { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Employee Manager { get; set; }
    }
}
