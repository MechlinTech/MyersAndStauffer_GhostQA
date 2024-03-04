CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateRootRelation]
@RootId         int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	4th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateRootRelation 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		UPDATE [dbo].[tbl_RootRelation]
		SET 
			Name    = @Name
			WHERE RootId  = @RootId

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT RootId [id], Parent [parentId], [Name] [name]
						FROM tbl_RootRelation where RootId  = @RootId
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