using Microsoft.EntityFrameworkCore;
using TimeYourselfBack.Repositories.Models;

namespace TimeYourselfBack.Repositories
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
        public DbSet<Clients> Clients { get; set; }
        public DbSet<Config> Config { get; set; }
        public DbSet<Visualizer> Visualizer { get; set; }

        public void AddTest(object item)
        {
            // Add to db:
            // _dbContext.Add(test);
            // _dbContext.SaveChanges();

            // Remove from db:
            //_dbContext.Remove(toDel);
            //_dbContext.SaveChanges();

            // Edit db:
            // _dbContext.Update(toEdit);
            // _dbContext.SaveChanges();
        }

    }
}
