CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCases]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCases
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestCases
**************************************************************************************/
BEGIN TRY
	SELECT [TestCasesListJson] = JSON_QUERY((
		SELECT DISTINCT [TestCaseName]
		FROM tbl_TestCase
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestCasesListJson]
END CATCH