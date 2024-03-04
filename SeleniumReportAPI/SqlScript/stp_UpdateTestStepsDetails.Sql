CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateTestStepsDetails]
@TestStepsDetailsId         int,
@TestCaseDetailsId		    int,
@TestStepsName	            VARCHAR(100),
@ActionName                 VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateTestStepsDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateTestStepsDetails 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		UPDATE [dbo].[tbl_TestStepsDetails]
		SET [TestCaseDetailsId] = @TestCaseDetailsId,
		    [TestStepsName]     = @TestStepsName,
            [ActionName]        = @ActionName
			WHERE [TestStepsDetailsId]  = @TestStepsDetailsId
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Added Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT TestStepsDetailsId [id], TestCaseDetailsId [testCaseDetailsId], [TestStepsName] [testStepsName] , [ActionName] [actionName]
						FROM tbl_TestStepsDetails where [TestStepsDetailsId] = @TestStepsDetailsId
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