USE [SeleniumTest]
GO
/****** Object:  StoredProcedure [dbo].[stp_AddUpdateEnvironment]    Script Date: 1/23/2024 5:48:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[stp_AddUpdateEnvironment]
@EnvironmentName		VARCHAR(100),
@EnvironmentId			INT = 0,
@ApplicationId          INT,
@BrowserId              INT,
@Baseurl                VARCHAR(100),
@BasePath				VARCHAR(100),
@DriverPath				VARCHAR(100),
@CreatedBy				VARCHAR(100) = 'Admin',
@ModifiedBy				VARCHAR(100) = 'Admin'
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateEnvironment
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	19 Jan 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	23 Jan 2024
PROC EXEC		:  EXEC stp_AddUpdateEnvironment 0
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS( SELECT 1 FROM tbl_Environments WHERE [EnvironmentName] = @EnvironmentName AND [EnvironmentId] <> @EnvironmentId)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Environment Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @EnvironmentId = 0
	BEGIN
		INSERT INTO tbl_Environments (EnvironmentName, ApplicationId, DriverPath, BroswerId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, BasePath, Baseurl, Description) 
		VALUES (@EnvironmentName, @ApplicationId, @DriverPath, @BrowserId, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), @BasePath, @Baseurl, @Description)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Environment Saved Successfully' [message]
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
		UPDATE tbl_Environments
			SET[EnvironmentName]   = @EnvironmentName,
               [ApplicationId]	   = @ApplicationId,
			   [DriverPath]		   = @DriverPath,
               [BroswerId]		   = @BrowserId,
               [ModifiedBy]		   = @ModifiedBy,
			   [ModifiedOn]        = GETDATE(),
               [BasePath]          = @BasePath,
			   [Baseurl]           = @Baseurl,
			   [Description]	   = @Description
		WHERE [EnvironmentId]	   = @EnvironmentId

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Environments Updated Successfully' [message]
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