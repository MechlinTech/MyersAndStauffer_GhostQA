CREATE OR ALTER PROCEDURE [dbo].[stp_AddRootRelation]
@RootId         int = 0,
@Node		    int,
@Parent	        int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddRootRelation 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_RootRelation] (RootId, Node, Parent, Name) 
		VALUES (@RootId, @Node, @Parent, @Name)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Added Successfully' [message]
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