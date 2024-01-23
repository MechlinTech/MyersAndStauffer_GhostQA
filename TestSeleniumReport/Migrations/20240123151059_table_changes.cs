using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestSeleniumReport.Migrations
{
    public partial class table_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tbl_TestSuites",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "tbl_TestSuites");
        }
    }
}
