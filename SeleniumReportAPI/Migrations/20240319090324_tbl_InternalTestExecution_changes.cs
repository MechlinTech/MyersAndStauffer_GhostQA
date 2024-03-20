using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class tbl_InternalTestExecution_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "tbl_TestData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "tbl_PerformanceFile",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SuiteDuration",
                table: "tbl_InternalTestExecutions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TestDuration",
                table: "tbl_InternalTestExecutions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TestScreenShotUrl",
                table: "tbl_InternalTestExecutions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TesterName",
                table: "tbl_InternalTestExecutions",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "tbl_TestData");

            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "tbl_PerformanceFile");

            migrationBuilder.DropColumn(
                name: "SuiteDuration",
                table: "tbl_InternalTestExecutions");

            migrationBuilder.DropColumn(
                name: "TestDuration",
                table: "tbl_InternalTestExecutions");

            migrationBuilder.DropColumn(
                name: "TestScreenShotUrl",
                table: "tbl_InternalTestExecutions");

            migrationBuilder.DropColumn(
                name: "TesterName",
                table: "tbl_InternalTestExecutions");
        }
    }
}
