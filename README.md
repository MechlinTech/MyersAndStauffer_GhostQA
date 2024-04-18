#  GhostQA




# Open Prem Deployment

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
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Ghost-QA/GhostQA/main/deploy.ps1" -OutFile "deploy.sh"; ./deploy.ps1
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
