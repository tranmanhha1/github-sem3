namespace EmployeeManagement.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Location { get; set; }
        public int NumberOfPersonals { get; set; }
        public ICollection<Employee_Tbl> Employee { get; set; }
        public int NumberOfEmployees { get; internal set; }
    }

}
