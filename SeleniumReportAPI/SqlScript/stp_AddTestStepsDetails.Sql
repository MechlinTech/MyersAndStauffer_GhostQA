CREATE OR ALTER   PROCEDURE [dbo].[stp_AddTestStepsDetails]
@TestStepsDetailsId         int = 0,
@TestCaseDetailsId		    int,
@TestStepsName	            VARCHAR(100),
@ActionName                 VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestStepsDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddTestStepsDetails 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_TestStepsDetails] (TestStepsDetailsId, TestCaseDetailsId, TestStepsName, ActionName) 
		VALUES (@TestStepsDetailsId, @TestCaseDetailsId, @TestStepsName, @ActionName)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Added Successfully' [message]
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