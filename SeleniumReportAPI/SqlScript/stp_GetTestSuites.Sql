CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestSuits]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestSuits
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestSuits
**************************************************************************************/
BEGIN TRY
	SELECT [TestSuites] = JSON_QUERY((
		SELECT [TestSuiteName] FROM
		(SELECT DISTINCT [TestSuiteName] [TestSuiteName]
		FROM tbl_TestCase
		UNION
		SELECT DISTINCT [TestSuiteName] [TestSuiteName]
		FROM tbl_TestSuites) tbl
	FOR JSON PATH)) 
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuites]
END CATCH