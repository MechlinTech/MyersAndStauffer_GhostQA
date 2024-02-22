CREATE OR ALTER  PROCEDURE [dbo].[stp_GetBrowsers]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetBrowsers
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	22 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetBrowsers
**************************************************************************************/
BEGIN TRY
	SELECT [Browsers] = JSON_QUERY((
		SELECT [BrowserName], 
		       [BrowserId]
		FROM tbl_Browsers
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [Browsers]
END CATCH