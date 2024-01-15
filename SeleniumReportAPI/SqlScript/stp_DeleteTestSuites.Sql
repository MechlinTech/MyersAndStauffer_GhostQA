CREATE OR ALTER PROCEDURE stp_DeleteTestSuites
@TestSuiteId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteTestSuites
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	15 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteTestSuites 1001
**************************************************************************************/
BEGIN TRY
	DELETE FROM tbl_TestSuites
	WHERE [TestSuiteId] = @TestSuiteId

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Test Suite Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [testSuiteListJson]
END CATCH