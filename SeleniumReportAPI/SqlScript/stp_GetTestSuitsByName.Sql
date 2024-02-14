CREATE OR ALTER  PROCEDURE [dbo].[stp_GetTestSuitsByName]
@TestSuiteName VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestSuitsByName
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	18 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestSuitsByName
**************************************************************************************/
BEGIN TRY
		SELECT
		        [TestSuiteName],
				[TestSuiteType],
				[ApplicationId],
				[SendEmail],
				[EnvironmentId],
				[SelectedTestCases],
		        [TestSuiteId],
				[Description]
		FROM tbl_TestSuites
		WHERE TestSuiteName = @TestSuiteName
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [GetTestSuites]
END CATCH