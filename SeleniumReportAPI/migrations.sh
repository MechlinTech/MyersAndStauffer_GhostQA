#!/bin/bash
dotnet ef database update

# Execute the SQL script for stored procedures
echo "Executing AllGhostQA_SP.sql against the database..."
/opt/mssql-tools/bin/sqlcmd -S db,1433 -U sa -P P@ssw0rd@123### -i /SeleniumReportAPI/SqlScript/AllGhostQA_SP.sql
