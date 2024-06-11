#  GhostQA

# Feature we are offering

## Pre Requiestes 

1. Fuctional Testing  - Local Testing
    1. Your Framework Code  and Ghost QA Team needs to make CHange in that code    
2. Fuctional Testing  - Test Labs
    1. Docker COmpantible Machine
3. Perforamce Testing
     1. Docker Compantible Machine

  Hardware Requirements


  ## On-Prem Setup Guide Using Bat file
  Instructions to setup GhostQA using.bat file

Step 1-: Need to provide framework code for Core application referent and to generate the published file for UI and API
Step 2-: Install IIS on the machine using the below guide.
Installing Internet Information Services (IIS)
To install Internet Information Services (IIS), follow the steps below:
1.	Start > Control Panel > Programs and Features
 
2.	Click Turn Windows features on or off. The Windows Features window will appear.
3.	Ensure all features under Internet Information Services and Microsoft .NET Framework are selected.

4.	Click OK to install selected Windows components, including IIS.
5.	To access IIS, click the Windows Start button. The Start menu/screen appears. Start typing Internet Information Services Manager in the search field and click the Internet Information Services (IIS) Manager once it appears.
 
6.	Need to install re-write URL module 2.1
https://www.iis.net/downloads/microsoft/url-rewrite
7.	Need to install .NET Core Hosting Bundle Search over Chrome / any web browser and install
 
https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/hosting-bundle?view=aspnetcore-8.0#direct-download
8.	After installation of IIS make sure we have all permission for IUser & IISUser for that specific folder with the published project file.
 

 

9.	Here we have to extract one file in the C: directory so it will work with recording 
1.	Here is the file download link by which we can download and extract it in the C: drive 
Download FFmpeg 
Step 3-: Install SQL Server using the below guide with Mixed Mode Authentication
	https://www.bu.edu/csmet/files/2021/02/SQL-Server-2019-Installation-Guide.pdf
1.	After installation of SQL Server needs to work on below things
Create the Database using the database name
Run the Script to create tables using the script below
 
Run the other script for creating procedures using the below script
 
Run one more script on the database for the initial user setup
 

Run the above script in the same order as mentioned above
Step 4-: Download the provided zip file for GhostQA application setup
1-	Put the files like 
a.	GhostQA_API
b.	GhostQA_UI
c.	SetupApp.bat
 
Into a published folder where we have all admin access
Right-click on the SetupApp.bat file and run as Admin
It will create two sites on IIS one for API and another for UI
Step 5-: Setup application 
1-	Need to change in appseting.json regarding the connection string
2-	The connection string will use a username and password
3-	Create all required folders which are mentioned in appsetting.json
4-	Create a Data folder in GhostQA_UI/Images folder of the published application
5-	Create a folder in GhostQA_API of the published folder with the name UploadedLogo

Now we are ready to run our application using our IP address and port visible during bat file running in the command prompt
Once we can login into GhostQA Application need to setup Browser, Application, Environment, and user in Settings section
We have to execute the inbuilt test suite at least once to proceed with GhostQA custom test suite feature


# Open Prem Deployment Using IIS


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
