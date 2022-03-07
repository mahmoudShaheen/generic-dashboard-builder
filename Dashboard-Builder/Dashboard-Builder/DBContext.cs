using Microsoft.EntityFrameworkCore;
using DashboardBuilder.Models;

namespace DashboardBuilder.DataContext
{
    public class DBContext : DbContext
    {
        public DbSet<Dashboard> Dashboards { get; set; }

        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }
    }
}
