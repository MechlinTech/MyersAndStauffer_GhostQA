using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class tbl_TestStepsDetails_create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    HaveAttributeValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TestStepsDetails", x => x.TestStepsDetailsId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_TestStepsDetails");
        }
    }
}
