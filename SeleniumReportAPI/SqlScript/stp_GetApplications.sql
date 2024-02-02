USE [SeleniumTest]
GO
/****** Object:  StoredProcedure [dbo].[stp_GetApplications]    Script Date: 1/23/2024 4:10:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[stp_GetApplications]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetApplications
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	16 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetApplications
**************************************************************************************/
BEGIN TRY
	SELECT [ApplicationListJson] = JSON_QUERY((
		SELECT [ApplicationId], [ApplicationName]
		FROM tbl_Applications
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [ApplicationListJson]
END CATCH