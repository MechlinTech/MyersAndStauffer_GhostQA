CREATE OR ALTER PROCEDURE [dbo].[stp_AddProjectRootRelation]
@ParentId	        int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddProjectRootRelation 
				
**************************************************************************************/
BEGIN TRY
   IF EXISTS( SELECT 1 FROM tbl_ProjectRootRelation WHERE [ParentId] = @ParentId AND [Name] = @Name)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_ProjectRootRelation] ([ParentId], [Name]) 
		VALUES (@ParentId, @Name)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], '' [message],
					[Data] = JSON_QUERY((
						SELECT Id [id], ParentId [parentId], [Name] [name]
						FROM tbl_ProjectRootRelation where Id = SCOPE_IDENTITY()
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