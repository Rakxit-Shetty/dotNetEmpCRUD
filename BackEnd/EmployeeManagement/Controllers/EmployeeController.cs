using EmployeeManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _employeeContext;
        public EmployeeController(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
        }

        [HttpGet("GetEmployeeInfo")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_employeeContext.Employees == null)
            {
                return NotFound();
            }
            else
            {
                return await _employeeContext.Employees.ToListAsync();
            }
        }

        [HttpGet("GetEmployeeInfoById/{id}")]
        public async Task<ActionResult<Employee>> GetEmployees(int id)
        {
            if (_employeeContext.Employees == null)
            {
                return NotFound();
            }
            else
            {
                var employee = await _employeeContext.Employees.FindAsync(id);
                if (employee == null)
                {
                    return NotFound();
                }
                else
                {
                    return employee;

                }
            }
        }


        [HttpPost("AddEmployee")]
        public async Task<ActionResult<Employee>> AddNew(Employee employee)
        {
           
            if (string.IsNullOrWhiteSpace(employee.Name) || string.IsNullOrWhiteSpace(employee.Email))
            {
                return BadRequest("Name and Email are required fields.");
            }

            _employeeContext.Employees.Add(employee);

            try
            {
                await _employeeContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetEmployees), new { id = employee.Id }, employee);
        }



        [HttpPut("UpdateEmployee/{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(int id, Employee employee)
        {
            
            if (string.IsNullOrWhiteSpace(employee.Name) || string.IsNullOrWhiteSpace(employee.Email))
            {
                return BadRequest("Name and Email are required fields.");
            }


            if (id != employee.Id)
            {
                return BadRequest("ID in the URL does not match the employee's ID.");
            }

            _employeeContext.Entry(employee).State = EntityState.Modified;

            try
            {
                await _employeeContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the employee exists
                if (!EmployeeExists(id))
                {
                    return NotFound($"Employee with ID {id} not found.");
                }
                return StatusCode(500, "An error occurred while updating the employee.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NoContent(); 
        }

        private bool EmployeeExists(int id)
        {
            return _employeeContext.Employees.Any(e => e.Id == id);
        }




        [HttpDelete("DeleteEmployee/{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            if (_employeeContext.Employees == null)
            {
                return NotFound();
            }
            var emp = await _employeeContext.Employees.FindAsync(id);
            if (emp == null)
            {
                return NotFound();
            }
            _employeeContext.Employees.Remove(emp);
            await _employeeContext.SaveChangesAsync();
            return Ok();
        }
 
    }
}
