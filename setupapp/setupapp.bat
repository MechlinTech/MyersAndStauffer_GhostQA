@echo off
setlocal EnableDelayedExpansion

	REM Get the current directory of the .bat file
	set "CurrentDir=%~dp0"

	REM Define folder paths for UI and API
	set "APIFolder=%CurrentDir%GhostQA_API"
	set "UIFolder=%CurrentDir%GhostQA_UI"

	REM Specify the port for the new sites
	set "APIPort=3001"
	set "UIPort=3002"

	REM Get the IPv4 address of the current system
	for /f "tokens=*" %%i in ('powershell -Command "([System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) | Where-Object { $_.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork }).IPAddressToString"') do set "ipv4=%%i"

	REM Check if the IPv4 address was retrieved
	if not defined ipv4 (
		echo Error: Unable to retrieve IPv4 address.
		exit /b 1
	) else (
		echo Success: Retrieved IPv4 address: %ipv4%
	)

	REM Create the API site with hostname
	echo Creating API site...
	powershell -Command "New-IISSite -Name 'GhostQA_APISite' -PhysicalPath '%APIFolder%' -BindingInformation '*:%APIPort%:' -Force"
	if %errorlevel% neq 0 (
		echo Error: Failed to create API site.
		exit /b 1
	) else (
		echo Success: API site created.
	)

	REM Create the UI site with hostname
	echo Creating UI site...
	powershell -Command "New-IISSite -Name 'GhostQA_UISite' -PhysicalPath '%UIFolder%' -BindingInformation '*:%UIPort%:' -Force"
	if %errorlevel% neq 0 (
		echo Error: Failed to create UI site.
		exit /b 1
	) else (
		echo Success: UI site created successfully: 'http://%ipv4%:%UIPort%'
	)

	REM Check and update config.json if it exists
	echo Checking for config.json...
	if exist "!UIFolder!\config.json" (
		powershell -Command "$json = Get-Content '%UIFolder%\config.json' -Raw | ConvertFrom-Json; $json.REACT_APP_BASE_URL = 'http://%ipv4%:%APIPort%/API'; $json | ConvertTo-Json -Depth 100 | Set-Content '%UIFolder%\config.json'"
		if %errorlevel% neq 0 (
			echo Error: Failed to update config.json.
			exit /b 1
		) else (
			echo Success: config.json updated successfully.
		)
	) else (
		echo Error: config.json does not exist at !UIFolder!\config.json
	)

	REM Whitelist the API port in the firewall
	echo Whitelisting API port %APIPort%...
	netsh advfirewall firewall add rule name="GhostQA_API_Port_%APIPort%" protocol=TCP dir=in localport=%APIPort% action=allow
	if %errorlevel% neq 0 (
		echo Error: Failed to whitelist API port %APIPort%.
		exit /b 1
	) else (
		echo Success: API port %APIPort% whitelisted.
	)

	REM Whitelist the UI port in the firewall
	echo Whitelisting UI port %UIPort%...
	netsh advfirewall firewall add rule name="GhostQA_UI_Port_%UIPort%" protocol=TCP dir=in localport=%UIPort% action=allow
	if %errorlevel% neq 0 (
		echo Error: Failed to whitelist UI port %UIPort%.
		exit /b 1
	) else (
		echo Success: UI port %UIPort% whitelisted.
	)

pause
