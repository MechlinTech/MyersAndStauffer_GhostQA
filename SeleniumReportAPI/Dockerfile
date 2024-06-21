# Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
# For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

#installing chrome
RUN apt-get update \
    && apt-get install -y wget gnupg2 unzip

RUN apt-get update && \
    apt-get install -y \
    wget \
    gnupg \
    libappindicator3-1 \
    fonts-liberation \
    libasound2 \
    libnspr4 \
    libnss3 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*
# Copy the google-chrome-stable .deb file into the Docker image
COPY SeleniumReportAPI/chrome/linux/google-chrome-stable_125.0.6422.141-1_amd64.deb /tmp/

# Install the .deb package
RUN apt-get update && \
    dpkg -i /tmp/google-chrome-stable_125.0.6422.141-1_amd64.deb || apt-get -f install -y && \
    rm /tmp/google-chrome-stable_125.0.6422.141-1_amd64.deb && \
    rm -rf /var/lib/apt/lists/*

# Change working directory
RUN mkdir -p /usr/local/bin
WORKDIR /usr/local/bin/

# Download ChromeDriver
COPY SeleniumReportAPI/chrome/linux/chromedriver-linux64.zip ./chromedriver-linux64.zip
# Unzip ChromeDriver
RUN apt-get install -y unzip && \
    unzip chromedriver-linux64.zip 
 
# Set execute permissions for ChromeDriver
RUN chmod +x /usr/local/bin/chromedriver-linux64/chromedriver

# Verify installation
CMD ["chromedriver", "--version"]

WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SeleniumReportAPI/SeleniumReportAPI.csproj", "SeleniumReportAPI/"]
COPY ["MyersAndStaufferAutomation/MyersAndStaufferSeleniumTests/MyersAndStaufferSeleniumTests.csproj", "MyersAndStaufferAutomation/MyersAndStaufferSeleniumTests/"]
COPY ["MyersAndStaufferAutomation/MyersAndStaufferFramework/MyersAndStaufferFramework.csproj", "MyersAndStaufferAutomation/MyersAndStaufferFramework/"]
RUN dotnet restore "SeleniumReportAPI/SeleniumReportAPI.csproj"
RUN dotnet restore "MyersAndStaufferAutomation/MyersAndStaufferSeleniumTests/MyersAndStaufferSeleniumTests.csproj"
RUN dotnet restore "MyersAndStaufferAutomation/MyersAndStaufferFramework/MyersAndStaufferFramework.csproj"
COPY . .
WORKDIR "/src/SeleniumReportAPI"
RUN dotnet build "SeleniumReportAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "SeleniumReportAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Install mssql-tools for sqlcmd
RUN apt-get update && \
    apt-get install -y curl gnupg2 && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev

# # Copy the SQL script
# COPY ["SeleniumReportAPI/SqlScript/AllGhostQA_SP.sql", "./SqlScript/AllGhostQA_SP.sql"]
# COPY ["SeleniumReportAPI/SqlScript/Insert_FirstUser.sql", "./SqlScript/Insert_FirstUser.sql"]

# Copy and set permissions for the entrypoint script
COPY ["SeleniumReportAPI/entrypoint.sh", "/app/"]
RUN apt-get update && apt install ffmpeg -y
# Use the entrypoint script to start the application
RUN sed -i 's/\r//' /app/entrypoint.sh \
	&& chmod +x /app/entrypoint.sh
ENTRYPOINT ["/bin/bash","/app/entrypoint.sh" ,"dotnet","SeleniumReportAPI.dll"]
# ENTRYPOINT ["dotnet" ,"SeleniumReportAPI.dll"]
