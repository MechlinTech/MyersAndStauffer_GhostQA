CREATE OR ALTER PROCEDURE [dbo].[stp_GetEnvironmentById]
@EnvironmentId int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetEnvironmentById
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetEnvironmentById
**************************************************************************************/
BEGIN TRY
		SELECT
		        E.[EnvironmentId],
				E.[EnvironmentName],
				E.[ApplicationId],
				(SELECT TOP 1 [ApplicationName] FROM tbl_Applications A WHERE A.[ApplicationId] = E.[ApplicationId]) [ApplicationName],
				E.[DriverPath],
		        E.[BroswerId],
				(SELECT TOP 1 [BrowserName] FROM tbl_Browsers B WHERE B.[BrowserId] = E.[BroswerId]) [BrowserName],
				E.[CreatedBy],
				E.[CreatedOn],
				E.[ModifiedBy],
				E.[ModifiedOn],
				E.[BasePath],
				E.[Baseurl]
		FROM tbl_Environments E
		WHERE EnvironmentId = @EnvironmentId
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [GetEnvironment]
END CATCH