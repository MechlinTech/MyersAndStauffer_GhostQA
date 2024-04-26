CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteTestUser]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteTestUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	25th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteTestUser 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM [tbl_TestUser] WHERE [Id] = @Id)
	BEGIN
		DELETE FROM [tbl_TestUser] WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Test User not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Test User Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [TestUserJson]
END CATCH