CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteFuncationalTestRun]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteFuncationalTestRun
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	9th May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteFuncationalTestRun 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_FunctionalTestRun WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_FunctionalTestRun WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Test Run not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Test Run Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [TestRun]
END CATCH