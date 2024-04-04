#!/bin/bash
dotnet tool update dotnet-ef
dotnet ef database update
tail -f /dev/null
