CREATE OR ALTER  PROCEDURE [dbo].[stp_GetAllActiveUserDetails]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetAllActiveUserDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	3rd May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetAllActiveUserDetails
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id],
			[UserName],
			[Email],
			ISNULL([IsDisabled], 'false') [IsDisabled]
		FROM [dbo].[AspNetUsers]
		WHERE [IsDisabled] = 0 OR [IsDisabled] IS NULL
		ORDER BY [UserName]
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [result]
END CATCH