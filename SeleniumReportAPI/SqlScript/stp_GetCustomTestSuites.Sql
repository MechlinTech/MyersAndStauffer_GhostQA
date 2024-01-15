CREATE OR ALTER PROCEDURE stp_GetCustomTestSuites
@TestSuiteName			VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetCustomTestSuites
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	15 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetCustomTestSuites
**************************************************************************************/
BEGIN TRY
	SELECT [testSuiteListJson] = JSON_QUERY((
		SELECT [TestSuiteId], [TestSuiteName]
		FROM tbl_TestSuites
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [testSuiteListJson]
END CATCH