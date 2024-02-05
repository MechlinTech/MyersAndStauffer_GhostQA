Create OR ALTER  PROCEDURE [dbo].[stp_DeleteBrowser]
@BrowserId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteBrowser
CREATED BY		:	Mohammad Yaseer
CREATED DATE	:	05 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteBrowser 1000
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Browsers WHERE [BrowserId] = @BrowserId)
	BEGIN
		DELETE FROM tbl_Browsers WHERE [BrowserId] = @BrowserId
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'This is not a Valid BrowserId' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Browser Deleted Successfully' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], CAST(@@ERROR AS NVARCHAR(20)) [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [BrowserListJson]
END CATCH