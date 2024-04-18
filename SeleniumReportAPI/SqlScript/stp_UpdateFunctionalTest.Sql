CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateFunctionalTest]
@RootId         INT,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateFunctionalTest
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	18th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateFunctionalTest 
				
**************************************************************************************/
BEGIN TRY
IF EXISTS( SELECT 1 FROM [dbo].[tbl_FuncationalTest] WHERE [RootId] <> @RootId AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		UPDATE [dbo].[tbl_FuncationalTest]
		SET 
			Name    = @Name
			WHERE RootId  = @RootId
    END
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT RootId [id], Parent [parentId], [Name] [name]
						FROM tbl_FuncationalTest where RootId  = @RootId
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
END TRY
BEGIN CATCH
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH