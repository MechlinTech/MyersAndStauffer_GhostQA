using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestSeleniumReport.Migrations
{
    public partial class tbl_environment_add_colunms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectedTestCases",
                table: "tbl_TestSuites");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationId",
                table: "tbl_Environments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "tbl_Environments",
                type: "varchar(100)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationId",
                table: "tbl_Environments");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "tbl_Environments");

            migrationBuilder.AddColumn<string>(
                name: "SelectedTestCases",
                table: "tbl_TestSuites",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
