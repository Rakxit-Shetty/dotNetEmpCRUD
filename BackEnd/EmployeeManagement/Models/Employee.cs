namespace EmployeeManagement.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime? DOB { get; set; }
        public string? Designation {  get; set; }
        public string? Email { get; set; }
        public decimal? Salary { get; set; }


    }
}
