CREATE OR ALTER PROCEDURE [dbo].[stp_AddFunctionalSuiteRelation]
@Parent	        INT,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddFunctionalSuiteRelation
CREATED BY		:	Lokesh
CREATED DATE	:	1th June, 2024
PROC EXEC		:  EXEC stp_AddRootRelation
				
**************************************************************************************/
BEGIN TRY
 IF EXISTS( SELECT 1 FROM [dbo].[tbl_FunctionalSuiteRelation] WHERE [Parent] = @Parent AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_FunctionalSuiteRelation] (Parent, [Name]) 
		VALUES (@Parent, @Name)

		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], '' [message],
					[Data] = JSON_QUERY((
						SELECT Id [id], Parent [parentId], [Name] [name]
						FROM [dbo].[tbl_FunctionalSuiteRelation] where Id = SCOPE_IDENTITY()
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