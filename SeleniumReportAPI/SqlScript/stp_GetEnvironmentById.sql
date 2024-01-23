
CREATE OR ALTER PROCEDURE [dbo].[stp_GetEnvironmentById]
@EnvironmentId int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetEnvironmentById
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetEnvironmentById
**************************************************************************************/
BEGIN TRY
		SELECT
		        [EnvironmentId],
				[EnvironmentName],
				[ApplicationId],
				[DriverPath],
		        [BroswerId],
				[CreatedBy],
				[CreatedOn],
				[ModifiedBy],
				[ModifiedOn],
				[BasePath],
				[Baseurl]
		FROM tbl_Environments
		WHERE EnvironmentId = @EnvironmentId
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [GetEnvironment]
END CATCH