using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class tbl_CypressPerfomanceDetaills_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProcessDataJson",
                table: "tbl_CypressPerfomanceDetaills",
                newName: "LoadDataJson");

            migrationBuilder.AddColumn<string>(
                name: "LoactionDataJson",
                table: "tbl_CypressPerfomanceDetaills",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TestDataJson",
                table: "tbl_CypressPerfomanceDetaills",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PropertyDataJson",
                table: "tbl_CypressPerfomanceDetaills",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoactionDataJson",
                table: "tbl_CypressPerfomanceDetaills");

            migrationBuilder.DropColumn(
                name: "TestDataJson",
                table: "tbl_CypressPerfomanceDetaills");

            migrationBuilder.DropColumn(
                name: "PropertyDataJson",
                table: "tbl_CypressPerfomanceDetaills");

            migrationBuilder.RenameColumn(
                name: "LoadDataJson", 
                table: "tbl_CypressPerfomanceDetaills",
                newName: "ProcessDataJson");
        }
    }
}
