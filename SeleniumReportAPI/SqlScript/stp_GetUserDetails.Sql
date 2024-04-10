CREATE OR ALTER PROCEDURE [dbo].[stp_GetUserDetails]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetUserDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	28 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetUserDetails
**************************************************************************************/
BEGIN TRY
	SELECT [UsersListJson] = JSON_QUERY((
		SELECT [Id],
			[UserName],
			[Email],
			ISNULL([IsDisabled], 'false') [IsDisabled]
		FROM [dbo].[AspNetUsers]
		ORDER BY [UserName]
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [UsersListJson]
END CATCH