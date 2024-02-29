
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
               CASE WHEN [FullName] IS NULL THEN '' ELSE [FullName] END AS [FullName],
			   CASE WHEN [OrganizationName] IS NULL THEN '' ELSE [OrganizationName] END AS [OrganizationName],
			   CASE WHEN [IsDisabled] IS NULL THEN 'false' ELSE [IsDisabled] END AS [IsDisabled]
		FROM dbo.AspNetUsers
		WHERE [Email] = @Email
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [GetUserProfile]
END CATCH