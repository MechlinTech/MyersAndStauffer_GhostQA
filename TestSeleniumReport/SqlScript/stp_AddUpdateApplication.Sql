CREATE OR ALTER  PROCEDURE [dbo].[stp_AddUpdateApplication]
@ApplicationName		VARCHAR(100),
@ApplicationId			INT = 0
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateApplication
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	19 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddUpdateApplication 0
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS( SELECT 1 FROM tbl_Applications WHERE [ApplicationName] = @ApplicationName)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Application Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @ApplicationId = 0
	BEGIN
		INSERT INTO tbl_Applications (ApplicationName) 
		VALUES (@ApplicationName)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Application Saved Successfully' [message]
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
		UPDATE tbl_Applications
			SET[ApplicationName]    = @ApplicationName
		WHERE [ApplicationId]		= @ApplicationId

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Applicaiton Updated Successfully' [message]
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