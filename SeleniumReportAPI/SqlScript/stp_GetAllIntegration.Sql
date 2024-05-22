CREATE OR ALTER PROCEDURE [dbo].[stp_GetAllIntegration]
@UserId          VARCHAR(100)
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
	IF NOT EXISTS(SELECT 1 FROM tbl_Integration WHERE [UserId] = @UserId)
	BEGIN
		INSERT INTO tbl_Integration([UserId], [AppName], [IsIntegrated], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn], [Domain], [Email],
		 [APIKey]) VALUES(@UserId, 'Jira', 0, @UserId, GETDATE(), @UserId, GETDATE(), NULL, NULL, NULL),
		 (@UserId, 'MS Teams/Slack', 0, @UserId, GETDATE(), @UserId, GETDATE(), NULL, NULL, NULL)
	END
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
		WHERE [UserId] = @UserId
		FOR JSON PATH, INCLUDE_NULL_VALUES
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [result]
END CATCH