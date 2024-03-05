CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteRootRelation]
@RootId			Int,
@ParentId		Int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	5th Mar 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteRootRelation 1
**************************************************************************************/
BEGIN TRY
	UPDATE tbl_RootRelation
	SET Parent = @ParentId
	WHERE [Parent] = @RootId

	DELETE FROM tbl_RootRelation 
	WHERE [RootId] = @RootId

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
	SELECT ERROR_MESSAGE() [RootRelation]
END CATCH
