using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class testStepsDetails_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TestStepsName",
                table: "tbl_TestStepsDetails");

            migrationBuilder.AlterColumn<string>(
                name: "ActionName",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IsOption",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SelectorType",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SelectorValue",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "tbl_TestStepsDetails",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "IsOption",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "SelectorType",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "SelectorValue",
                table: "tbl_TestStepsDetails");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "tbl_TestStepsDetails");

            migrationBuilder.AlterColumn<string>(
                name: "ActionName",
                table: "tbl_TestStepsDetails",
                type: "varchar(100)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            
        }
    }
}
