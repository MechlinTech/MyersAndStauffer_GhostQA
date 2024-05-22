using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class changes_tbl_Integration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "APIKey",
                table: "tbl_Integration",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "tbl_Integration",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "tbl_Integration",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "APIKey",
                table: "tbl_Integration");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "tbl_Integration");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "tbl_Integration");
        }
    }
}
