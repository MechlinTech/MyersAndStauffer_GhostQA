CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteTestSuites]
@TestSuiteName			VARCHAR(100)
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
	IF EXISTS(SELECT 1 FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName)
	BEGIN
		IF EXISTS(SELECT 1 FROM tbl_TestCase WHERE [TestSuiteName] = @TestSuiteName)
		BEGIN
			DELETE FROM tbl_TestCase WHERE [TestSuiteName] = @TestSuiteName
		END
		DELETE FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'This is not a Custom Test Suite' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

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