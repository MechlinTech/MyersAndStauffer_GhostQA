#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TestSeleniumReport/TestSeleniumReport.csproj", "TestSeleniumReport/"]
COPY ["MyersAndStaufferAutomation/MyersAndStaufferSeleniumTests/MyersAndStaufferSeleniumTests.csproj", "MyersAndStaufferAutomation/MyersAndStaufferSeleniumTests/"]
COPY ["MyersAndStaufferAutomation/MyersAndStaufferFramework/MyersAndStaufferFramework.csproj", "MyersAndStaufferAutomation/MyersAndStaufferFramework/"]

# Set the platform here
RUN dotnet restore "MyersAndStaufferAutomation/MyersAndStaufferFramework/MyersAndStaufferFramework.csproj" \
    && dotnet build "MyersAndStaufferAutomation/MyersAndStaufferFramework/MyersAndStaufferFramework.csproj" -c Release -o /app/build --self-contained  
RUN dotnet restore "TestSeleniumReport/TestSeleniumReport.csproj" 

COPY . .

WORKDIR "/src/TestSeleniumReport"
RUN dotnet build "TestSeleniumReport.csproj" -c Release -o /app/build --self-contained 

FROM build AS publish
RUN dotnet publish "TestSeleniumReport.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TestSeleniumReport.dll"]