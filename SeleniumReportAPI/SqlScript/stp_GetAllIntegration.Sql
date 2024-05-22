CREATE OR ALTER PROCEDURE [dbo].[stp_GetAllIntegration]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetAllIntegration
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	20 May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetAllIntegration
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id],
			   [UserId],
			   [AppName],
			   [IsIntegrated],
			   [CreatedBy],
			   [CreatedOn],
			   [UpdatedBy],
			   [UpdatedOn],
			   [Domain],
			   [Email],
			   [APIKey]
		FROM tbl_Integration
		FOR JSON PATH, INCLUDE_NULL_VALUES
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [result]
END CATCH