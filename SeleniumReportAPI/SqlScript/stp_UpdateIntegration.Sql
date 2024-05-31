CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateIntegration]
@UserId               VARCHAR(100),
@IsIntegrated         Bit,
@Domain				  VARCHAR(100),
@Email				  VARCHAR(100),
@APIKey				  VARCHAR(100),
@AppName			  VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateIntegration
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	20th May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateIntegration 
				
**************************************************************************************/
BEGIN TRY
		UPDATE tbl_Integration
		SET [IsIntegrated]        = @IsIntegrated,
			[UpdatedBy]			  = @UserId,
			[UpdatedOn]			  = GETDATE(),
			[Domain]			  = @Domain,
			[Email]				  = @Email,
			[APIKey]			  = @APIKey
			WHERE [AppName] = @AppName AND [UserId] = @UserId
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message]
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
END TRY
BEGIN CATCH
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH