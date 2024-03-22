CREATE OR ALTER PROCEDURE [dbo].[stp_AddTestCaseDetails]
@TestCaseDetailsId         int = 0,
@RootId		               int,
@StartUrl                  VARCHAR(100),
@TestCaseName              VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestCaseDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	21st March 2024
PROC EXEC		:  EXEC stp_AddTestCaseDetails 
				
**************************************************************************************/
BEGIN TRY
  IF EXISTS( SELECT 1 FROM tbl_TestCaseDetails WHERE [RootId] = @RootId AND [TestCaseName] = @TestCaseName)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Test Case Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_TestCaseDetails] ( RootId, TestCaseName, StartUrl) 
		VALUES (@RootId, @TestCaseName,@StartUrl)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Added Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT TestCaseDetailsId [id], RootId [rootId], [TestCaseName] [testCaseName], [StartUrl] [startUrl]
						FROM tbl_TestCaseDetails where TestCaseDetailsId = SCOPE_IDENTITY()
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