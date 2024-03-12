using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class tbl_performanceFile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_PerformanceFile",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RootId = table.Column<int>(type: "int", nullable: false),
                    TestCaseName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fileName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_PerformanceFile", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_TestStepsDetails",
                columns: table => new
                {
                    TestStepsDetailsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TestCaseDetailsId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StepDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectorType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectorValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClickType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsOptional = table.Column<bool>(type: "bit", nullable: true),
                    ElementSelector = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectedDragDroptype = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssignInputValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KeyPressValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelectedModifierKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExecuteJavaScript = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PauseTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExitTestStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NavigateTo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JavaScriptCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Accessibility = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccessibilityModifier = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VariableName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExtractVariable = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JavascriptVariable = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImportingStepFrom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VariableInput = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_TestStepsDetails", x => x.TestStepsDetailsId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_PerformanceFile");

            migrationBuilder.DropTable(
                name: "tbl_TestStepsDetails");
        }
    }
}
