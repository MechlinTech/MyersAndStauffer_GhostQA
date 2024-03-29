CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteTestCaseDetailsByTestCaseDetailsId]
@TestCaseDetailsId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteTestCaseDetailsByTestCaseDetailsId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	26th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteTestCaseDetailsByTestCaseDetailsId 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_TestCaseDetails WHERE [TestCaseDetailsId] = @TestCaseDetailsId)
	BEGIN
		DELETE FROM tbl_TestCaseDetails WHERE [TestCaseDetailsId] = @TestCaseDetailsId
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'TestCaseDetail not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'TestCaseDetail Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [TestDataJson]
END CATCH