CREATE OR ALTER PROCEDURE [dbo].[stp_GetJiraDetailsByUserId]
@UserId          VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetJiraDetailsByUserId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	23 May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetJiraDetailsByUserId '5782a89b-3714-4a0d-88f0-8f5b9435454c'
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Domain],
			   [Email],
			   [APIKey]
		FROM tbl_Integration
		WHERE [UserId] = @UserId
		FOR JSON PATH, INCLUDE_NULL_VALUES, WITHOUT_ARRAY_WRAPPER
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [result]
END CATCH