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

		INSERT INTO tbl_TestStepsDetails([TestCaseDetailsId], [ActionName], [Description], [IsOption], [SelectorType], [SelectorValue], [Text])
		SELECT 
			JSON_VALUE(@AddStepsJson, '$.testCaseID'),
			action.[description],
			action.[actionName],
			action.[selectorType],
			action.[selectorValue],
			action.[text],
			action.[isOption]
		FROM 
			OPENJSON(@AddStepsJson, '$.actions') 
			WITH (
				[description] NVARCHAR(50) '$.description',
				[actionName] NVARCHAR(50) '$.actionName',
				[selectorType] NVARCHAR(50) '$.selectorType',
				[selectorValue] NVARCHAR(50) '$.selectorValue',
				[text] NVARCHAR(50) '$.text',
				[isOption] NVARCHAR(50) '$.isOption'
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