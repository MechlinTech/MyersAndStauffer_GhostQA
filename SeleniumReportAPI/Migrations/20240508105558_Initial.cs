using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    OrganizationName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Applications",
                columns: table => new
                {
                    ApplicationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1000, 1"),
                    ApplicationName = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Applications", x => x.ApplicationId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Browsers",
                columns: table => new
                {
                    BrowserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrowserName = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Browsers", x => x.BrowserId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_CypressPerfomanceDetaills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RootId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RunId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EndDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoadDataJson = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    TesterName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoactionDataJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestDataJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyDataJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalUser = table.Column<int>(type: "int", nullable: false),
                    Scenarios = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalDuration = table.Column<int>(type: "int", nullable: false),
                    TotalRampUpSteps = table.Column<int>(type: "int", nullable: false),
                    TotalRampUpTime = table.Column<int>(type: "int", nullable: false),
                    MaxDuration = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_CypressPerfomanceDetaills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_CypressTestExecution",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TestSuite = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestCaseId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestCaseDetailsId = table.Column<int>(type: "int", nullable: false),
                    TestCaseName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EndDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SuiteDuration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestStepJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestDuration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestScreenShotUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TesterName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestVideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContainerLog = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_CypressTestExecution", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Environments",
                columns: table => new
                {
                    EnvironmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1000, 1"),
                    EnvironmentName = table.Column<string>(type: "varchar(100)", nullable: false),
                    ApplicationId = table.Column<int>(type: "int", nullable: false),
                    Baseurl = table.Column<string>(type: "varchar(1000)", nullable: false),
                    BasePath = table.Column<string>(type: "varchar(1000)", nullable: false),
                    DriverPath = table.Column<string>(type: "varchar(1000)", nullable: false),
                    BroswerId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Environments", x => x.EnvironmentId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_FuncationalTest",
                columns: table => new
                {
                    RootId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Node = table.Column<int>(type: "int", nullable: true),
                    Parent = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_FuncationalTest", x => x.RootId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_FunctionalTestCase",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RootId = table.Column<int>(type: "int", nullable: false),
                    TestCaseName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PreCondition = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Steps = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpectedResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActualResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedOn = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_FunctionalTestCase", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_FunctionalTestRun",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RootId = table.Column<int>(type: "int", nullable: false),
                    TestRunName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestRunDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BuildVersion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Environment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Milestone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssignedTo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestCases = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedOn = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_FunctionalTestRun", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_InternalTestExecutions",
                columns: table => new
                {
                    TestSuite = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestCase = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestCaseName = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    Status = table.Column<string>(type: "VARCHAR(10)", nullable: true),
                    StartDateTime = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    EndDateTime = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    SuiteDuration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestStepJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestDuration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestScreenShotUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TesterName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestVideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "tbl_Load",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PerformanceFileId = table.Column<int>(type: "int", nullable: false),
                    TotalUsers = table.Column<int>(type: "int", nullable: true),
                    DurationInMinutes = table.Column<int>(type: "int", nullable: true),
                    RampUpTimeInSeconds = table.Column<int>(type: "int", nullable: true),
                    RampUpSteps = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Load", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Location",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Location", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_PerformanceFile",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RootId = table.Column<int>(type: "int", nullable: false),
                    TestCaseName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_PerformanceFile", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_PerformanceLocation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PerformanceFileId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumberUser = table.Column<int>(type: "int", nullable: false),
                    PercentageTraffic = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_PerformanceLocation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_PerformanceProperties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PerformanceFileId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_PerformanceProperties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_ProjectRootRelation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_ProjectRootRelation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_RootRelation",
                columns: table => new
                {
                    RootId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Node = table.Column<int>(type: "int", nullable: true),
                    Parent = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_RootRelation", x => x.RootId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_TestCase",
                columns: table => new
                {
                    TestSuiteName = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestRunName = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestCaseName = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestCaseStatus = table.Column<string>(type: "VARCHAR(10)", nullable: true),
                    TestCaseVideoURL = table.Column<string>(type: "NVARCHAR(1000)", nullable: true),
                    TestSuiteStartDateTime = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    TestSuiteEndDateTime = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    TestRunStartDateTime = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    TestRunEndDateTime = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    TestCaseSteps = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TesterName = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestEnvironment = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "tbl_TestCaseDetails",
                columns: table => new
                {
                    TestCaseDetailsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RootId = table.Column<int>(type: "int", nullable: false),
                    TestCaseName = table.Column<string>(type: "varchar(100)", nullable: false),
                    StartUrl = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TestCaseDetails", x => x.TestCaseDetailsId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_TestData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PerformanceFileId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JsonData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TestData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_TestExecution",
                columns: table => new
                {
                    ExecutionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1000, 1"),
                    TestSuiteName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestRunName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestCaseName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestEnvironment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TesterName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExecutionStartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsExecutionInProgress = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TestExecution", x => x.ExecutionId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_TestStepsDetails",
                columns: table => new
                {
                    TestStepsDetailsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TestCaseDetailsId = table.Column<int>(type: "int", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StepDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsOptional = table.Column<bool>(type: "bit", nullable: true),
                    SelectorType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectorValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SendKeyInput = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ScrollPixel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectedUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ElementValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CssValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CssProperty = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PageTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CurrentUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShouldNotEqualValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShouldIncludeValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShouldEqualValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShouldGreaterThanValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShouldLessValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContainTextValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HaveAttributeValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Wait = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TestStepsDetails", x => x.TestStepsDetailsId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_TestSuites",
                columns: table => new
                {
                    TestSuiteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1000, 1"),
                    TestSuiteName = table.Column<string>(type: "varchar(100)", nullable: false),
                    TestSuiteType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicationId = table.Column<int>(type: "int", nullable: false),
                    SendEmail = table.Column<bool>(type: "bit", nullable: false),
                    EnvironmentId = table.Column<int>(type: "int", nullable: false),
                    SelectedTestCases = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TestSuites", x => x.TestSuiteId);
                });

            migrationBuilder.CreateTable(
                name: "tbl_TestUser",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedOn = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TestUser", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "tbl_Applications");

            migrationBuilder.DropTable(
                name: "tbl_Browsers");

            migrationBuilder.DropTable(
                name: "tbl_CypressPerfomanceDetaills");

            migrationBuilder.DropTable(
                name: "tbl_CypressTestExecution");

            migrationBuilder.DropTable(
                name: "tbl_Environments");

            migrationBuilder.DropTable(
                name: "tbl_FuncationalTest");

            migrationBuilder.DropTable(
                name: "tbl_FunctionalTestCase");

            migrationBuilder.DropTable(
                name: "tbl_FunctionalTestRun");

            migrationBuilder.DropTable(
                name: "tbl_InternalTestExecutions");

            migrationBuilder.DropTable(
                name: "tbl_Load");

            migrationBuilder.DropTable(
                name: "tbl_Location");

            migrationBuilder.DropTable(
                name: "tbl_PerformanceFile");

            migrationBuilder.DropTable(
                name: "tbl_PerformanceLocation");

            migrationBuilder.DropTable(
                name: "tbl_PerformanceProperties");

            migrationBuilder.DropTable(
                name: "tbl_ProjectRootRelation");

            migrationBuilder.DropTable(
                name: "tbl_RootRelation");

            migrationBuilder.DropTable(
                name: "tbl_TestCase");

            migrationBuilder.DropTable(
                name: "tbl_TestCaseDetails");

            migrationBuilder.DropTable(
                name: "tbl_TestData");

            migrationBuilder.DropTable(
                name: "tbl_TestExecution");

            migrationBuilder.DropTable(
                name: "tbl_TestStepsDetails");

            migrationBuilder.DropTable(
                name: "tbl_TestSuites");

            migrationBuilder.DropTable(
                name: "tbl_TestUser");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
