using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestSeleniumReport.Migrations
{
    public partial class tbl_Browser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "driverPath",
                table: "tbl_Environments",
                newName: "DriverPath");

            migrationBuilder.RenameColumn(
                name: "baseurl",
                table: "tbl_Environments",
                newName: "Baseurl");

            migrationBuilder.RenameColumn(
                name: "basePath",
                table: "tbl_Environments",
                newName: "BasePath");

            migrationBuilder.CreateTable(
                name: "tbl_Browsers",
                columns: table => new
                {
                    BrowserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrowserName = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Browsers", x => x.BrowserId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_Browsers");

            migrationBuilder.RenameColumn(
                name: "DriverPath",
                table: "tbl_Environments",
                newName: "driverPath");

            migrationBuilder.RenameColumn(
                name: "Baseurl",
                table: "tbl_Environments",
                newName: "baseurl");

            migrationBuilder.RenameColumn(
                name: "BasePath",
                table: "tbl_Environments",
                newName: "basePath");
        }
    }
}