# Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
# For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

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

# Copy the SQL script
COPY ["SeleniumReportAPI/SqlScript/AllGhostQA_SP.sql", "./SqlScript/AllGhostQA_SP.sql"]
COPY ["SeleniumReportAPI/SqlScript/Insert_FirstUser.sql", "./SqlScript/Insert_FirstUser.sql"]

# Copy and set permissions for the entrypoint script
COPY ["SeleniumReportAPI/entrypoint.sh", "/app/"]

# Use the entrypoint script to start the application
RUN sed -i 's/\r//' /app/entrypoint.sh \
	&& chmod +x /app/entrypoint.sh
ENTRYPOINT ["/bin/bash","/app/entrypoint.sh" ,"dotnet","SeleniumReportAPI.dll"]
# ENTRYPOINT ["dotnet" ,"SeleniumReportAPI.dll"]