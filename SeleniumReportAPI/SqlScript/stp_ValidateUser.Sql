CREATE OR ALTER PROCEDURE [dbo].[stp_ValidateUser]
@UserName			VARCHAR(100),
@Password			NVARCHAR(1000)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_ValidateUser
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_ValidateUser 'admin@gmail.com', 'Admin@123'
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT * FROM AspNetUsers WHERE [UserName] = @UserName AND [PasswordHash] = @Password)
	BEGIN
		SELECT 'Success' [isValidUser], 
				[UserDetails] = JSON_QUERY((
					SELECT 
						UserName,  
						 REPLACE(CONCAT(UPPER(SUBSTRING(UserName, 1, 1)), LOWER(SUBSTRING(UserName, 2, CHARINDEX('@', UserName) - 1))),'@','') [Name]
					FROM AspNetUsers WHERE [UserName] = @UserName AND [PasswordHash] = @Password
					FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
				))
	END
	ELSE
	BEGIN
		SELECT 'User Name or Password is wrong' [isValidUser]
	END
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [isValidUser]
END CATCH