using Microsoft.EntityFrameworkCore;

namespace  Student.Api.Data;

public class MyWorldDbContext : DbContext
{
    public MyWorldDbContext(DbContextOptions<MyWorldDbContext> options) : base(options)
    {
 
    }
    public DbSet<Student.Api.Data.Entities.Student> Student { get; set; }
}