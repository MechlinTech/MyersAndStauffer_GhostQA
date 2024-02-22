using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SeleniumReportAPI.Models;

namespace SeleniumReportAPI.DBContext
{
    public class AppDBContext : IdentityDbContext<IdentityUser>
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<TestSuites> tbl_TestSuites { get; set; }
        public DbSet<Models.Applications> tbl_Applications { get; set; }
        public DbSet<Models.Environments> tbl_Environments { get; set; }
        public DbSet<Models.Browsers> tbl_Browsers { get; set; }
        public DbSet<TestCase> tbl_TestCase { get; set; }
        public DbSet<TestExecution> tbl_TestExecution { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TestSuites>()
            .Property(e => e.TestSuiteId)
            .HasColumnName("TestSuiteId")
            .UseIdentityColumn(seed: 1000);

            builder.Entity<Applications>()
            .Property(e => e.ApplicationId)
            .HasColumnName("ApplicationId")
            .UseIdentityColumn(seed: 1000);

            builder.Entity<Models.Environments>()
            .Property(e => e.EnvironmentId)
            .HasColumnName("EnvironmentId")
            .UseIdentityColumn(seed: 1000);

            builder.Entity<Models.TestExecution>()
            .Property(e => e.ExecutionId)
            .HasColumnName("ExecutionId")
            .UseIdentityColumn(seed: 1000);

            builder.Entity<Models.TestCase>().HasNoKey();

            base.OnModelCreating(builder);
        }
    }
}