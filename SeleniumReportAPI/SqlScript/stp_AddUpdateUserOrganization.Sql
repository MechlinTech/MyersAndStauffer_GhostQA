CREATE OR ALTER PROCEDURE [dbo].[stp_AddUpdateUserOrganization]
@Id			            INT = 0,
@UserId                 NVARCHAR(MAX),
@LogoPath				NVARCHAR(MAX),
@Description			NVARCHAR(MAX),
@CreatedBy				NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateUserOrganization
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	16 May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddUpdateUserOrganization 0
				
**************************************************************************************/
BEGIN TRY
	IF @Id = 0
	BEGIN
		INSERT INTO tbl_UsersOrganization (UserId, LogoPath, [Description], CreatedBy, CreatedOn, UpdatedBy, UpdatedOn) 
		VALUES (@UserId, @LogoPath, @Description, @CreatedBy, GETDATE(), Null, Null)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Users Organization Saved Successfully' [message]
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
	END
	ELSE
	BEGIN 
		UPDATE tbl_UsersOrganization
			SET [UserId]           = @UserId,
               [LogoPath]	       = @LogoPath,
			   [Description]	   = @Description,
               [UpdatedBy]		   = @CreatedBy,
               [UpdatedOn]		   = GETDATE()
		WHERE [Id] = @Id

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Users Organization Updated Successfully' [message]
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
	END
END TRY
BEGIN CATCH
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH