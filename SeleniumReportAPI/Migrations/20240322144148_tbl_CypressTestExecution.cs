using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class tbl_CypressTestExecution : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_CypressTestExecution",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
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
                    TestVideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_CypressTestExecution", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_CypressTestExecution");
        }
    }
}
