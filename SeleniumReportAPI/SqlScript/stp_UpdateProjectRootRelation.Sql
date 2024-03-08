CREATE OR ALTER  PROCEDURE [dbo].[stp_UpdateProjectRootRelation]
@Id             int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateProjectRootRelation 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		UPDATE [dbo].[tbl_ProjectRootRelation]
		SET 
			Name      = @Name
			WHERE Id  = @Id

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT Id [id], ParentId [parentId], [Name] [name]
						FROM tbl_ProjectRootRelation where Id  = @Id
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