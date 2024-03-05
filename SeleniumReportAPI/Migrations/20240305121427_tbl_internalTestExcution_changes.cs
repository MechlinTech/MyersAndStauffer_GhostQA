using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class tbl_internalTestExcution_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_internalTestExecutions",
                columns: table => new
                {
                    TestSuite = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestCase = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    TestCaseName = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    Status = table.Column<string>(type: "VARCHAR(10)", nullable: true),
                    StartDateTime = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    EndDateTime = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    TestStepJson = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_internalTestExecutions");
        }
    }
}
