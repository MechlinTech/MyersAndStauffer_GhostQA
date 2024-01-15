using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TestSeleniumReport.Models;

namespace TestSeleniumReport.DBContext
{
    public class AppDBContext : IdentityDbContext<IdentityUser>
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
        : base(options)
        {
        }
        public DbSet<TestSuites> tbl_TestSuites { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TestSuites>()
            .Property(e => e.TestSuiteId)
            .HasColumnName("TestSuiteId")
            .UseIdentityColumn(seed: 1000);

            base.OnModelCreating(builder);
        }
    }
}
