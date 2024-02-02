using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestSeleniumReport.Migrations
{
    public partial class envdescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tbl_Environments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "tbl_Environments");
        }
    }
}
