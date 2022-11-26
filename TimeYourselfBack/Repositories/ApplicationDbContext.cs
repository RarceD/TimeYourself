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
    }
}
