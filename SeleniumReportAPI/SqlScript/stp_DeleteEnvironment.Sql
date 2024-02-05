Create OR ALTER PROCEDURE [dbo].[stp_DeleteEnvironment]
@EnvironmentId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteEnvironment
CREATED BY		:	Mohammad Yaseer
CREATED DATE	:	05 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteEnvironment 1000
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Environments WHERE [EnvironmentId] = @EnvironmentId)
	BEGIN
		DELETE FROM tbl_Environments WHERE [EnvironmentId] = @EnvironmentId
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'This is not a Valid EnvironmentId' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Environment Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [EnvironmentListJson]
END CATCH