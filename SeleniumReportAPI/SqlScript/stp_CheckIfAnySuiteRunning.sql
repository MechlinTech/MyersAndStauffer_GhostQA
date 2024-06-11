CREATE OR ALTER PROCEDURE [dbo].[stp_CheckIfAnySuiteRunning]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_CheckIfAnySuiteRunning
CREATED BY		:	Lokesh
CREATED DATE	:	30 May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:	EXEC stp_CheckIfAnySuiteRunning
**************************************************************************************/
BEGIN TRY
	IF NOT EXISTS(SELECT 1 FROM dbo.tbl_ExistingSuiteRun)
	BEGIN
		INSERT INTO dbo.tbl_ExistingSuiteRun (IsExistingSuiteRunning) VALUES (0)
	END

	SELECT IsExistingSuiteRunning FROM dbo.tbl_ExistingSuiteRun
END TRY
BEGIN CATCH
	--Error handling
END CATCH