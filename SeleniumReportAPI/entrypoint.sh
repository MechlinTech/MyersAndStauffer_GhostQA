#!/bin/bash

# Function to check if SQL Server is up and accepting connections.
wait_for_sql() {
    echo "Checking SQL Server connection..."

    while ! /opt/mssql-tools/bin/sqlcmd -S db -U sa -P P@ssw0rd@123### -Q "SELECT 1" > /dev/null 2>&1; do
        echo "Waiting for SQL Server to be available..."
        sleep 1
    done

    echo "SQL Server is up and accepting connections."
}

# Wait for SQL Server to be ready.
wait_for_sql





# Start the application
# dotnet SeleniumReportAPI.dll
