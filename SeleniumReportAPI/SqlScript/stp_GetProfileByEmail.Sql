
CREATE OR ALTER  PROCEDURE [dbo].[stp_GetProfileByEmail]
@Email		        VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetProfileByEmail
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	29 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_GetProfileByEmail 
				
**************************************************************************************/
BEGIN TRY
		SELECT [UserProfile] = JSON_QUERY((
		SELECT [Id], 
			   [UserName],
               [Email],
               ISNULL([FullName], '') [FullName],
			   ISNULL([OrganizationName],'') [OrganizationName],
			   ISNULL([IsDisabled], 'false') [IsDisabled]
		FROM dbo.AspNetUsers
		WHERE [Email] = @Email
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [GetUserProfile]
END CATCH