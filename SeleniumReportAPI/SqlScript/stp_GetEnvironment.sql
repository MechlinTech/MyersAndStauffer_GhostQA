USE [SeleniumTest]
GO
/****** Object:  StoredProcedure [dbo].[stp_GetEnvironment]    Script Date: 1/23/2024 5:50:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[stp_GetEnvironment]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetEnvironment
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	16 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetEnvironment
**************************************************************************************/
BEGIN TRY
	SELECT [EnvironmentListJson] = JSON_QUERY((
		SELECT env.[EnvironmentId],
		       [EnvironmentName],
			   env.[ApplicationId],
			   app.[ApplicationName],
			   [DriverPath],
			   env.BroswerId,
			   bro.[BrowserName],
               [CreatedBy],
			   [CreatedOn],
			   [ModifiedBy],
			   [ModifiedOn],
			   [BasePath],
			   [Baseurl]
		FROM tbl_Environments as env
	   LEFT JOIN tbl_Applications as app
		ON env.ApplicationId = app.ApplicationId
	   LEFT	JOIN tbl_Browsers as bro
		ON env.BroswerId = bro.BrowserId
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [EnvironmentListJson]
END CATCH