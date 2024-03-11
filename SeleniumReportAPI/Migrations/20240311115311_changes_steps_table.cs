using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class changes_steps_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Text",
                table: "tbl_TestStepsDetails",
                newName: "VariableName");

            migrationBuilder.RenameColumn(
                name: "IsOption",
                table: "tbl_TestStepsDetails",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "tbl_TestStepsDetails",
                newName: "StepDescripton");

            migrationBuilder.RenameColumn(
                name: "ActionName",
                table: "tbl_TestStepsDetails",
                newName: "SelectedModifierKey");

            migrationBuilder.AddColumn<string>(
                name: "Accessibility",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AccessibilityModifier",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignInputValue",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClickType",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ElementSelector",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExecuteJavaScript",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExitTestStatus",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtractVariable",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImportingStepFrom",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOptional",
                table: "tbl_TestStepsDetails",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JavaScriptCode",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JavascriptVariable",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KeyPressValue",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NavigatTo",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PauseTime",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SelectedDragDroptype",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accessibility",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "AccessibilityModifier",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "AssignInputValue",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "ClickType",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "ElementSelector",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "ExecuteJavaScript",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "ExitTestStatus",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "ExtractVariable",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "ImportingStepFrom",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "IsOptional",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "JavaScriptCode",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "JavascriptVariable",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "KeyPressValue",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "NavigatTo",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "PauseTime",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "SelectedDragDroptype",
                table: "tbl_TestStepsDetails");

            migrationBuilder.RenameColumn(
                name: "VariableName",
                table: "tbl_TestStepsDetails",
                newName: "Text");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "tbl_TestStepsDetails",
                newName: "IsOption");

            migrationBuilder.RenameColumn(
                name: "StepDescripton",
                table: "tbl_TestStepsDetails",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "SelectedModifierKey",
                table: "tbl_TestStepsDetails",
                newName: "ActionName");
        }
    }
}
