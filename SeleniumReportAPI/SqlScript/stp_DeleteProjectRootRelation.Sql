CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteProjectRootRelation]
@Id			    Int,
@ParentId		Int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th Mar 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteProjectRootRelation 1
**************************************************************************************/
BEGIN TRY
	UPDATE tbl_ProjectRootRelation
	SET  ParentId = @ParentId
	WHERE [ParentId] = @Id

	DELETE FROM tbl_ProjectRootRelation 
	WHERE [Id] = @Id

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [ProjectRootRelation]
END CATCH
