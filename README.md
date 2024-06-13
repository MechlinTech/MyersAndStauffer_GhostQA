# GhostQA

  

# System Requirements

  

Before setting up GhostQA, ensure your system meets the following hardware and software requirements:

  

## Hardware Requirements

  

-  **Windows OS**: Latest version.

-  **RAM**: Minimum 8 GB.

-  **SSD**: At least 250 GB with a minimum of 150 GB of available space.

-  **Admin Access**: Required for the machine, SQL Server, and installation of software with admin rights.

  

## Software Requirements

To successfully set up and run GhostQA, ensure the following software is installed on your machine:
-  **SQL Server**: Latest Version
-  **IIS**: Install using the Windows feature on/off option.
  
# On-Prem Setup Guide Using Batch File

## Instructions to Set Up GhostQA Using a .bat File
	If IIS is not installed on the system need to follow Step 1
### Step 1: Install IIS

#### To install Internet Information Services (IIS) using Windows Normal Edition, follow these steps:

1. Go to `Start > Control Panel > Programs and Features`.

2. Click on `Turn Windows features on or off`. The Windows Features window will appear.

3. Ensure all features under Internet Information Services and Microsoft .NET Framework are selected.

4. Click `OK` to install the selected Windows components, including IIS.

5. To access IIS, click the Windows Start button. Start typing `Internet Information Services Manager` in the search field and click `Internet Information Services (IIS) Manager` once it appears.
 
	   If SQL Server is not installed on the system need to follow Step 2
### Step 2: Install SQL Server
Follow this guide to install SQL Server with Mixed Mode Authentication: [SQL Server 2019 Installation Guide](https://www.bu.edu/csmet/files/2021/02/SQL-Server-2019-Installation-Guide.pdf).
After installing SQL Server, perform the following tasks:
1. Create the database and provide database name.
2. Run the script to create tables. [Table Script](https://github.com/MechlinTech/MyersAndStauffer_GhostQA/blob/main/SeleniumReportAPI/SqlScript/TableScript.sql)
3. Run the script to create procedures. [SP Script](https://github.com/MechlinTech/MyersAndStauffer_GhostQA/blob/main/SeleniumReportAPI/SqlScript/AllGhostQA_SP.sql)
4. Run the script for the initial user setup. [Initial User Script](https://github.com/MechlinTech/MyersAndStauffer_GhostQA/blob/main/SeleniumReportAPI/SqlScript/Insert_FirstUser.sql)

	Ensure the scripts are run in the order mentioned above.

### Step 3: Download the Provided Zip File
Download the provided zip file for the GhostQA application setup and perform the following steps:
1. Place the files:
	-  `GhostQA_API`
	-  `GhostQA_UI`
	-  `SetupApp.bat`
2. Create a Published Folder Named as `Published Project`
	-  Ensure all permissions are granted for `Published Project` for users`IUser` and `IISUser` for the folder containing the published project files.
	- If not need to right-click on the folder and in `properties` check the `security` tab
	- Click on `Edit` Option
	- Click on the `Add` option to add users
	- Click on the `Advanced` option to search `IUser` and `IISUser`
	- Click on the `Find Now` option search for the above users and select one by one
	- Once you find and the user is visible in the list need to click on ok till the `security` page
	- Click on the users one by one and `Allow All` permissions
	- Click on `Ok` and save these changes
	- Download the provided `zip` folder for `setupApp` and extract in the same folder [Download Zip](https://github.com/MechlinTech/MyersAndStauffer_GhostQA/blob/main/SeleniumReportAPI/wwwroot/LatestSetupApp.zip)
	- make sure the `GhostQA_API` and `GhostQA_UI` folders are directly placed in the `Published Project` folder	
3. Right-click on the `SetupApp.bat` file and run it as an Administrator. It will create two sites on IIS, one for the API and another for the UI.
	- Once in the `command prompt` it is showing done copy the URL provided in the `command prompt` and try to open
	- After launching the URL default user name and password would be - `admin@gmail.com` and `Admin@123`

### Step 5: Set Up the Application

1. Modify the `appsettings.json` file to update the connection string with the appropriate username and password.

2. Create all required folders mentioned in the `appsettings.json` file.

  

# Option 2: Open Prem Deployment Using Docker

  

**Deployment Guide: Deploying GhostQA Web Application**

  

**Prerequisites:**

  

- Docker must be installed on the target system.

  

**Deployment Steps:**

  

1.  **Open PowerShell as User:**

  

- Open PowerShell on your system with user privileges.

- DO NOT OPEN AS ADMIN

  

2.  **Download and Execute Deployment Script:**

  

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

  

3.  **Accessing the Deployed Web Application:**

- After successful deployment, open the URL [http://127.0.0.1:30001](http://127.0.0.1:30001) in your web browser.

  

**Note:**

  

- Ensure that you have internet connectivity during the deployment process to download the required resources.

- Make sure that no other services are running on port 30001,80 or 443 to avoid conflicts with the deployed GhostQA web application.

  

## Troubleshooting

  

### Issue: Unable to Run PowerShell Script

  

#### Symptom:

  

When attempting to execute a PowerShell script downloaded you encounter the following error:

  

```powershell

./deploy.ps1 : deploy.ps1 cannot be loaded because running scripts is disabled on this

system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.

```

  

#### Solution:

  

1.  **Temporary Execution Policy Change**: Temporarily change the execution policy for the current PowerShell session to allow script execution using the following command:

  

```powershell

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force; Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Ghost-QA/GhostQA/main/deploy.ps1" -OutFile "deploy.ps1"; .\deploy.ps1; Set-ExecutionPolicy -ExecutionPolicy Default -Scope Process -Force

```

  

In case above does not work it seems ExecutionPolicy is restriced you can bypass the -ExecutionPolicy

  

```powershell

powershell -ExecutionPolicy Bypass -Command "(New-Object System.Net.WebClient).DownloadFile('https://raw.githubusercontent.com/Ghost-QA/GhostQA/main/deploy.ps1', '.\deploy.ps1'); .\deploy.ps1"

```

  

This command sets the execution policy to `RemoteSigned`, downloads and executes the script, and then resets the execution policy back to its default value.

  

2.  **Long-Term Execution Policy Change (Optional)**: If you anticipate running scripts frequently, consider permanently changing the execution policy. However, be cautious as this may pose security risks. You can change the execution policy using the following command:

  

```powershell

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

```

  

Replace `RemoteSigned` with `Unrestricted` if needed, but ensure you understand the security implications.

  

3.  **Further Information**: For more details on PowerShell execution policies and their implications, refer to the official Microsoft documentation on [`about_Execution_Policies`](https://go.microsoft.com/fwlink/?LinkID=135170).