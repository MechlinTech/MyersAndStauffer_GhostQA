CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateTestCaseDetails]
@TestCaseDetailsId         INT,
@StartUrl                  VARCHAR(100),
@TestCaseName              VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateTestCaseDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22nd March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateTestCaseDetails 
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_TestCaseDetails WHERE [TestCaseDetailsId] != @TestCaseDetailsId AND [TestCaseName] = @TestCaseName)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Test Case Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE
	BEGIN
		UPDATE tbl_TestCaseDetails
		SET [TestCaseName]   = @TestCaseName,
			[StartUrl]       = @StartUrl
			WHERE [TestCaseDetailsId] = @TestCaseDetailsId
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT TestCaseDetailsId [id], RootId [rootId], [TestCaseName] [testCaseName], [StartUrl] [startUrl]
						FROM tbl_TestCaseDetails where TestCaseDetailsId = @TestCaseDetailsId
						FOR JSON PATH
					))
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
	END
END TRY
BEGIN CATCH
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH