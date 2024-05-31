CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateSuiteRunStatus]
@IsSuiteRunning bit
AS
BEGIN TRY
	UPDATE dbo.tbl_ExistingSuiteRun
	SET IsExistingSuiteRunning = @IsSuiteRunning
END TRY
BEGIN CATCH
	--Error handling
END CATCH