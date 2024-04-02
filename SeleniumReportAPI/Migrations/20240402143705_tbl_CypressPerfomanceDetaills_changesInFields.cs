using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeleniumReportAPI.Migrations
{
    public partial class tbl_CypressPerfomanceDetaills_changesInFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_CypressPerfomanceDetaills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RootId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RunId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EndDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoadDataJson = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    TesterName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoactionDataJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestDataJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyDataJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalUser = table.Column<int>(type: "int", nullable: false),
                    Scenarios = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalDuration = table.Column<int>(type: "int", nullable: false),
                    TotalRampUpSteps = table.Column<int>(type: "int", nullable: false),
                    TotalRampUpTime = table.Column<int>(type: "int", nullable: false),
                    MaxDuration = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_CypressPerfomanceDetaills", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_CypressPerfomanceDetaills");
        }
    }
}
