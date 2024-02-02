using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class tbl_Browsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "tbl_Environments",
                newName: "driverPath");

            migrationBuilder.AddColumn<int>(
                name: "BroswerId",
                table: "tbl_Environments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "tbl_Environments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "tbl_Environments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "tbl_Environments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "tbl_Environments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "basePath",
                table: "tbl_Environments",
                type: "varchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "baseurl",
                table: "tbl_Environments",
                type: "varchar(100)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BroswerId",
                table: "tbl_Environments");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "tbl_Environments");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "tbl_Environments");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "tbl_Environments");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "tbl_Environments");

            migrationBuilder.DropColumn(
                name: "basePath",
                table: "tbl_Environments");

            migrationBuilder.DropColumn(
                name: "baseurl",
                table: "tbl_Environments");

            migrationBuilder.RenameColumn(
                name: "driverPath",
                table: "tbl_Environments",
                newName: "Url");
        }
    }
}