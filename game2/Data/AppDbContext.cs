using game2.Enitiy;
using Microsoft.EntityFrameworkCore;

namespace game2.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<NumberGame> Games { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<History> History { get; set; }


    }
}
