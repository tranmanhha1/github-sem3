using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EmployeeManagement.Models;

namespace EmployeeManagement.Data
{
    public class EmployeeManagementContext : DbContext
    {
        public EmployeeManagementContext (DbContextOptions<EmployeeManagementContext> options)
            : base(options)
        {
        }

        public DbSet<EmployeeManagement.Models.Employee_Tbl> Employee { get; set; } = default!;
        public DbSet<EmployeeManagement.Models.Department> Department { get; set; } = default!;
    }
}
