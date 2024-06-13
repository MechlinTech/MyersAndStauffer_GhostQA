# GhostQA

  

# System Requirements

  

Before setting up GhostQA, ensure your system meets the following hardware and software requirements:

  

## Hardware Requirements

  

-  **Windows OS**: 10 or Later and or Windows Server 2016 or Later

-  **RAM**: Minimum 16 GB.

-  **SSD**: At least 250 GB with a minimum of 150 GB of available space.

-  **Admin Access**: Required for the machine, SQL Server, and installation of software with admin rights.

  

## Software Requirements

To successfully set up and run GhostQA, ensure the following software is installed on your machine:
-  **SQL Server**: 18, 22 or Latest Version
-  **IIS**: 10 or Latest, Install using the Windows feature on/off option.
  
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