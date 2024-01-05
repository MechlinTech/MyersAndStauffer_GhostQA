CREATE OR ALTER PROCEDURE stp_ValidateUser
@UserName			VARCHAR(100),
@Password			NVARCHAR(1000)
AS
BEGIN TRY
	IF EXISTS(SELECT * FROM AspNetUsers WHERE [UserName] = @UserName AND [PasswordHash] = @Password)
	BEGIN
		SELECT 'Success' [isValidUser]
	END
	ELSE
	BEGIN
		SELECT 'User Name or Password is wrong' [isValidUser]
	END
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [isValidUser]
END CATCH