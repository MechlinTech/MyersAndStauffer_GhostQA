CREATE OR ALTER PROCEDURE [dbo].[stp_AddTestUser]
@Id                       INT,		
@UserName                 NVARCHAR(MAX),
@Password	              NVARCHAR(MAX),
@CreatedBy				  NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	25th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddTestUser 
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS( SELECT 1 FROM [tbl_TestUser] WHERE [UserName] = @UserName AND [Id] <> @Id)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate User Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @Id = 0
	BEGIN
		INSERT INTO [dbo].[tbl_TestUser] ([UserName],[Password], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy],[ModifiedOn]) 
		VALUES (@UserName, @Password, 0, @CreatedBy, GETDATE(), NULL, NULL)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'User Name Saved Successfully' [message]
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
	ELSE
	BEGIN 
		UPDATE [dbo].[tbl_TestUser]
			SET  [UserName]      = @UserName,
			     [Password]      = @Password,
				 [ModifiedBy]    = @CreatedBy,
				 [ModifiedOn]    = GETDATE()
		   WHERE [Id] = @Id

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'User Name Updated Successfully' [message]
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