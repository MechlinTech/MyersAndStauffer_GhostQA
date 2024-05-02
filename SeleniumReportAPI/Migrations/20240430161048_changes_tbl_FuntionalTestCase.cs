using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class changes_tbl_FuntionalTestCase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "tbl_FunctionalTestRun",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedOn",
                table: "tbl_FunctionalTestRun",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "tbl_FunctionalTestRun",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedOn",
                table: "tbl_FunctionalTestRun",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "tbl_FunctionalTestCase",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedOn",
                table: "tbl_FunctionalTestCase",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "tbl_FunctionalTestCase",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedOn",
                table: "tbl_FunctionalTestCase",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "tbl_FunctionalTestRun");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "tbl_FunctionalTestRun");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "tbl_FunctionalTestRun");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "tbl_FunctionalTestRun");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "tbl_FunctionalTestCase");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "tbl_FunctionalTestCase");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "tbl_FunctionalTestCase");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "tbl_FunctionalTestCase");
        }
    }
}
