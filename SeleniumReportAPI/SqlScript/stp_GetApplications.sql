CREATE OR ALTER PROCEDURE [dbo].[stp_GetApplications]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetApplications
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	16 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetApplications
**************************************************************************************/
BEGIN TRY
	SELECT [ApplicationListJson] = JSON_QUERY((
		SELECT [ApplicationId], [ApplicationName]
		FROM tbl_Applications
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [ApplicationListJson]
END CATCH