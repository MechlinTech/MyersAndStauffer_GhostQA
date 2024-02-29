CREATE OR ALTER  PROCEDURE [dbo].[stp_UpdateUserProfile]
@FullName		        VARCHAR(100),
@OrganizationName		VARCHAR(100),
@Email		            VARCHAR(100),
@Id			            NVARCHAR(450)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateUserProfile
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateUserProfile 
**************************************************************************************/
BEGIN TRY
		UPDATE [dbo].[AspNetUsers]
			SET  [FullName]            = @FullName,
				 [UserName]            = @Email,
				 [NormalizedUserName]  = UPPER(@Email),
				 [Email]               = @Email,
				 [NormalizedEmail]     = UPPER(@Email),
			     [OrganizationName]    = @OrganizationName
		WHERE [Id] = @Id
 
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Profile Updated Successfully' [message]
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