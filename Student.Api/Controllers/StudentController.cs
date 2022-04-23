using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Student.Api.Data;

namespace Student.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    private readonly MyWorldDbContext _myWorldDbContext;
    public StudentController(MyWorldDbContext myWorldDbContext)
    {
        _myWorldDbContext = myWorldDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var students = await _myWorldDbContext.Student.ToListAsync();
        return Ok(students);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Student.Api.Data.Entities.Student payload)
    {
        _myWorldDbContext.Student.Add(payload);
        await _myWorldDbContext.SaveChangesAsync();
        return Ok(payload);
    }

    [HttpPut]
    public async Task<IActionResult> Put(Student.Api.Data.Entities.Student payload)
    {
        _myWorldDbContext.Student.Update(payload);
        await _myWorldDbContext.SaveChangesAsync();
        return Ok(payload);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var studentToDelete = await _myWorldDbContext.Student.FindAsync(id);
        if (studentToDelete == null)
        {
            return NotFound();
        }
        _myWorldDbContext.Student.Remove(studentToDelete);
        await _myWorldDbContext.SaveChangesAsync();
        return Ok();
    }
}