CREATE OR ALTER   PROCEDURE [dbo].[stp_AddTestStepsDetails]
@AddStepsJson                 NVARCHAR(MAX)
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
		DELETE FROM tbl_TestStepsDetails 
		WHERE TestCaseDetailsId = JSON_VALUE(@AddStepsJson, '$.testCaseID')

		INSERT INTO tbl_TestStepsDetails(TestCaseDetailsId, TestStepsName, ActionName)
		SELECT 
			JSON_VALUE(@AddStepsJson, '$.testCaseID'),
			action.[separator],
			action.[type]
		FROM 
			OPENJSON(@AddStepsJson, '$.actions') 
			WITH (
				[type] NVARCHAR(50) '$.type',
				[separator] NVARCHAR(50) '$.separator'
			) AS action;
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