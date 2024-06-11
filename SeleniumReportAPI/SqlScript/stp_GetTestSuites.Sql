CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestSuits]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestSuits
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2024
MODIFIED BY		:	Mohammad Mobin
MODIFIED DATE	:	31 Jan 2024
PROC EXEC		:
				EXEC stp_GetTestSuits
**************************************************************************************/
BEGIN TRY
	SELECT [TestSuites] = JSON_QUERY((
		SELECT [TestSuiteName],[TestSuiteFlag] FROM
		(SELECT DISTINCT [TestSuiteName] [TestSuiteName], 'InBuilt' [TestSuiteFlag]
		FROM tbl_TestCase) tbl
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuites]
END CATCH