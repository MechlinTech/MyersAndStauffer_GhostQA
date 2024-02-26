CREATE OR ALTER  PROCEDURE [dbo].[stp_AddUser]
@Id         uniqueidentifier,
@Email		VARCHAR(100),
@Password	VARCHAR(100),
@normalizeEmail VARCHAR(100),
@securityStamp     uniqueidentifier
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	23 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddUser test@yopmail.com Test@123
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[AspNetUsers] (Id, UserName, Email, EmailConfirmed, PasswordHash, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnabled, 
		AccessFailedCount, NormalizedEmail,NormalizedUserName,SecurityStamp) 
		VALUES (@Id, @Email, @Email, 1, @Password, 0, 0, 0 ,0,@normalizeEmail, @normalizeEmail,@securityStamp)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Created User Successfully' [message]
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