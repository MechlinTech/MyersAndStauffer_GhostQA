CREATE OR ALTER   PROCEDURE [dbo].[stp_AddRootRelation]
@RootId         int = 0,
@Node		    int,
@Parent	        int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	9th April 2024
PROC EXEC		:  EXEC stp_AddRootRelation 
				
**************************************************************************************/
BEGIN TRY
 IF EXISTS( SELECT 1 FROM [dbo].[tbl_RootRelation] WHERE [Parent] = @Parent AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_RootRelation] ( Node, Parent, Name) 
		VALUES (@Node, @Parent, @Name)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], '' [message],
					[Data] = JSON_QUERY((
						SELECT RootId [id], Parent [parentId], [Name] [name]
						FROM tbl_RootRelation where RootId = SCOPE_IDENTITY()
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