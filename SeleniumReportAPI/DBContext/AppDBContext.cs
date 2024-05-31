﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SeleniumReportAPI.Models;

namespace SeleniumReportAPI.DBContext
{
    public class AppDBContext : IdentityDbContext<ApplicationUser>
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
        public DbSet<RootRelation> tbl_RootRelation { get; set; }
        public DbSet<TestCaseDetails> tbl_TestCaseDetails { get; set; }
        public DbSet<TestStepsDetails> tbl_TestStepsDetails { get; set; }
        public DbSet<InternalTestExecution> tbl_InternalTestExecutions { get; set; }
        public DbSet<ProjectRootRelation> tbl_ProjectRootRelation { get; set; }
        public DbSet<PerformanceFile> tbl_PerformanceFile { get; set; }
        public DbSet<PerformanceLocation> tbl_PerformanceLocation { get; set; }
        public DbSet<PerformanceProperties> tbl_PerformanceProperties { get; set; }
        public DbSet<TestData> tbl_TestData { get; set; }
        public DbSet<Load> tbl_Load { get; set; }
        public DbSet<CypressDetails> tbl_CypressTestExecution { get; set; }
        public DbSet<CypressPerfomanceDetaills> tbl_CypressPerfomanceDetaills { get; set; }
        public DbSet<Location> tbl_Location { get; set; }
        public DbSet<FuncationalTest> tbl_FuncationalTest { get; set; }
        public DbSet<TestUser> tbl_TestUser { get; set; }
        public DbSet<FunctionalTestCase> tbl_FunctionalTestCase { get; set; }
        public DbSet<FunctionalTestRun> tbl_FunctionalTestRun { get; set; }
        public DbSet<UsersOrganization> tbl_UsersOrganization { get; set; }
        public DbSet<Integration> tbl_Integration { get; set; }
        public DbSet<ExistingSuiteRun> tbl_ExistingSuiteRun { get; set; }
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

            builder.Entity<InternalTestExecution>().HasNoKey();

            base.OnModelCreating(builder);
        }
    }
}