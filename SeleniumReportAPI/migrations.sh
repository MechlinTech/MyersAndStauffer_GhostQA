#!/bin/bash
dotnet ef database update

# Execute the SQL script for stored procedures
echo "Executing AllGhostQA_SP.sql against the database..."
/opt/mssql-tools/bin/sqlcmd -S ${DB_HOST} -U ${DB_USER} -P ${DB_PASSWORD} -i /src/SeleniumReportAPI/SqlScript/AllGhostQA_SP.sql

tail -f /dev/null
