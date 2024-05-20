#!/bin/bash

# Define the URL of the Docker Compose file
composeFileUrl="https://raw.githubusercontent.com/MechlinTech/MyersAndStauffer_GhostQA/5065_sonia/docker-compose.yml"

# Download the Docker Compose file
wget "$composeFileUrl" -O docker-compose.yml


# Run docker-compose up command
docker compose up -d
