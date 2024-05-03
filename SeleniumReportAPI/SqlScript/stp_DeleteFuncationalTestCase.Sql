CREATE OR ALTER  PROCEDURE [dbo].[stp_DeleteFuncationalTestCase]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteFuncationalTestCase
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteFuncationalTestCase 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_FunctionalTestCase WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_FunctionalTestCase WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'TestCase not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'TestCase Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [TestListJson]
END CATCH