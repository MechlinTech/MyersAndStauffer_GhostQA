#!/bin/bash

# Define the URL of the Docker Compose file
composeFileUrl="https://raw.githubusercontent.com/MechlinTech/MyersAndStauffer_GhostQA/main/deploy.yml"

# Download the Docker Compose file
wget "$composeFileUrl" -O docker-compose.yml

docker pull ghostqa/codeengine:latest
docker pull mcr.microsoft.com/mssql/server:2019-latest
docker pull ghostqa/dotnetapi-migrations:latest
docker pull ghostqa/dotnetapi:latest
docker pull ghostqa/webui:latest

# Run docker-compose up command
docker compose up -d
