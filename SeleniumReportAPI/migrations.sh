﻿#!/bin/bash
dotnet ef database update

# Execute the SQL script for stored procedures
echo "Executing AllGhostQA_SP.sql against the database..."
/opt/mssql-tools/bin/sqlcmd -S ${DB_HOST} -U ${DB_USER} -P ${DB_PASSWORD} -d ${DB_NAME} -i /src/SeleniumReportAPI/SqlScript/AllGhostQA_SP.sql
/opt/mssql-tools/bin/sqlcmd -S ${DB_HOST} -U ${DB_USER} -P ${DB_PASSWORD} -d ${DB_NAME} -i /src/SeleniumReportAPI/SqlScript/Insert_FirstUser.sql

tail -f /dev/null