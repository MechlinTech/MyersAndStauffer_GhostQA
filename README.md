#  GhostQA

# System Requirements

Before setting up GhostQA, ensure your system meets the following hardware and software requirements:

## Hardware Requirements

- **Windows OS**: Latest version.
- **RAM**: Minimum 8 GB.
- **SSD**: At least 250 GB with a minimum of 150 GB of available space.
- **Admin Access**: Required for the machine, SQL Server, and installation of software with admin rights.

## Software Requirements

To successfully set up and run GhostQA, ensure the following software is installed on your machine:

- **Visual Studio**: Version 2022 or the latest version.
- **SQL Server**: Version 18 or 19.
- **Visual Studio Code**: Latest version.
- **Docker**: Follow the installation guide [here](https://docs.docker.com/desktop/install/windows-install/).
- **IIS**: Install using the Windows feature on/off option.
- **Network Ports**: Ensure at least two ports are open to set up backend and frontend code on different URLs.


# On-Prem Setup Guide Using Batch File

## Instructions to Set Up GhostQA Using a .bat File



### Step 1: Provide Framework Code

- Provide the framework code for the Core application reference and generate the published files for the UI and API.

### Step 2: Install IIS

To install Internet Information Services (IIS), follow these steps:

1. Go to `Start > Control Panel > Programs and Features`.
2. Click on `Turn Windows features on or off`. The Windows Features window will appear.
3. Ensure all features under Internet Information Services and Microsoft .NET Framework are selected.
4. Click `OK` to install the selected Windows components, including IIS.
5. To access IIS, click the Windows Start button. Start typing `Internet Information Services Manager` in the search field and click `Internet Information Services (IIS) Manager` once it appears.
6. Install the URL Rewrite module 2.1 from the following link: [URL Rewrite Module 2.1](https://www.iis.net/downloads/microsoft/url-rewrite).
7. Install the .NET Core Hosting Bundle by searching for it in any web browser and installing it from the following link: [Install .NET Core Hosting Bundle](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/hosting-bundle?view=aspnetcore-8.0#direct-download).
8. After installing IIS, ensure all permissions are granted for `IUser` and `IISUser` for the folder containing the published project files.
9. Extract the required file in the `C:` directory for recording functionality. The file can be downloaded and extracted from the following link: [Download FFmpeg](https://ffmpeg.org/download.html).

### Step 3: Install SQL Server

Follow this guide to install SQL Server with Mixed Mode Authentication: [SQL Server 2019 Installation Guide](https://www.bu.edu/csmet/files/2021/02/SQL-Server-2019-Installation-Guide.pdf).

After installing SQL Server, perform the following tasks:

1. Create the database using the provided database name.
2. Run the script to create tables.
3. Run the script to create procedures.
4. Run the script for the initial user setup.

Ensure the scripts are run in the order mentioned above.

### Step 4: Download the Provided Zip File

Download the provided zip file for the GhostQA application setup and perform the following steps:

1. Place the files:
    - `GhostQA_API`
    - `GhostQA_UI`
    - `SetupApp.bat`
    
   into a published folder where you have all administrative access.
2. Right-click on the `SetupApp.bat` file and run it as an Administrator. It will create two sites on IIS, one for the API and another for the UI.

### Step 5: Set Up the Application

1. Modify the `appsettings.json` file to update the connection string with the appropriate username and password.
2. Create all required folders mentioned in the `appsettings.json` file.
3. Create a `Data` folder in the `GhostQA_UI/Images` directory of the published application.
4. Create an `UploadedLogo` folder in the `GhostQA_API` directory of the published application.




# Open Prem Deployment Using Docker

**Deployment Guide: Deploying GhostQA Web Application**

**Prerequisites:**
- Docker must be installed on the target system.

**Deployment Steps:**

1. **Open PowerShell as User:**
    - Open PowerShell on your system with user privileges.
    - DO NOT OPEN AS ADMIN

2. **Download and Execute Deployment Script:**
    - Run the following command in PowerShell:
     - WINDOWS
        ```powershell
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Ghost-QA/GhostQA/main/deploy.ps1" -OutFile "deploy.ps1"; ./deploy.ps1
        ```

        Ubuntu
        ```sh
        wget -O - https://raw.githubusercontent.com/Ghost-QA/GhostQA/main/deploy.sh | bash
        ```

    This command will download the deployment script from the specified URL and execute it.

3. **Accessing the Deployed Web Application:**
    - After successful deployment, open the URL [http://127.0.0.1:30001](http://127.0.0.1:30001) in your web browser.


**Note:** 
- Ensure that you have internet connectivity during the deployment process to download the required resources.
- Make sure that no other services are running on port 30001,80 or 443 to avoid conflicts with the deployed GhostQA web application.


## Troubleshooting

### Issue: Unable to Run PowerShell Script

#### Symptom:
When attempting to execute a PowerShell script downloaded  you encounter the following error:

```powershell 
./deploy.ps1 : deploy.ps1 cannot be loaded because running scripts is disabled on this
system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
```

#### Solution:
1. **Temporary Execution Policy Change**: Temporarily change the execution policy for the current PowerShell session to allow script execution using the following command:
    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force; Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Ghost-QA/GhostQA/main/deploy.ps1" -OutFile "deploy.ps1"; .\deploy.ps1; Set-ExecutionPolicy -ExecutionPolicy Default -Scope Process -Force
    ```
    In case above does not work it seems ExecutionPolicy is restriced you can bypass the -ExecutionPolicy
    ```powershell
    powershell -ExecutionPolicy Bypass -Command "(New-Object System.Net.WebClient).DownloadFile('https://raw.githubusercontent.com/Ghost-QA/GhostQA/main/deploy.ps1', '.\deploy.ps1'); .\deploy.ps1"
    ```
    This command sets the execution policy to `RemoteSigned`, downloads and executes the script, and then resets the execution policy back to its default value.

2. **Long-Term Execution Policy Change (Optional)**: If you anticipate running scripts frequently, consider permanently changing the execution policy. However, be cautious as this may pose security risks. You can change the execution policy using the following command:
    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    ```

    Replace `RemoteSigned` with `Unrestricted` if needed, but ensure you understand the security implications.

3. **Further Information**: For more details on PowerShell execution policies and their implications, refer to the official Microsoft documentation on [`about_Execution_Policies`](https://go.microsoft.com/fwlink/?LinkID=135170).
