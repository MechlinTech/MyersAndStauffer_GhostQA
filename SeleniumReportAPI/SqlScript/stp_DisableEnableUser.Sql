
CREATE OR ALTER  PROCEDURE [dbo].[stp_DisableEnableUser]
@IsDisabled		        VARCHAR(100),
@UserId			        NVARCHAR(450)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DisableEnableUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	29 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_DisableEnableUser 
				
**************************************************************************************/
BEGIN TRY
		UPDATE [dbo].[AspNetUsers]
			SET  IsDisabled = @IsDisabled
		WHERE [Id] = @UserId

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