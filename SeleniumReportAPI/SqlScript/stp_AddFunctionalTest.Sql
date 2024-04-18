CREATE OR ALTER PROCEDURE [dbo].[stp_AddFunctionalTest]
@RootId         int = 0,
@Node		    int,
@Parent	        int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddFunctionalTest
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	18th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddFunctionalTest 0,0,0,'Test Nitin Workspace'
				
**************************************************************************************/
BEGIN TRY
 IF EXISTS( SELECT 1 FROM [dbo].[tbl_FuncationalTest] WHERE [Parent] = @Parent AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_FuncationalTest] ([Node], [Parent], [Name]) 
		VALUES (@Node, @Parent, @Name)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], 'successfully Added' [message],
					[Data] = JSON_QUERY((
						SELECT RootId [id], Parent [parentId], [Name] [name]
						FROM tbl_FuncationalTest where RootId = SCOPE_IDENTITY()
						FOR JSON PATH
					))
			FOR JSON PATH,WITHOUT_ARRAY_WRAPPER 
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