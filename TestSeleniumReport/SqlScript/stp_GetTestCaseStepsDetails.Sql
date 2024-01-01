CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseStepsDetails]
@TestSuiteName		VARCHAR(100),
@TestRunName		VARCHAR(100),
@TestCaseName		VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseStepsDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	20 Dec 2023
MODIFIED BY		:	Mohammad Mobin
MODIFIED DATE	:	26 Dec 2023
PROC EXEC		:
				EXEC stp_GetTestCaseStepsDetails 'Mississippi', 'TestRun-1', 'VerifyOK'
**************************************************************************************/
BEGIN TRY
	SELECT [TestCaseStepsJson] = JSON_QUERY((
		SELECT [TestCaseName], [TestCaseSteps],
			MIN(CAST([TestRunStartDateTime] AS DATETIMEOFFSET)) AS [TestCaseStartDate],
			MAX(CAST([TestRunEndDateTime] AS DATETIMEOFFSET)) AS [TestCaseEndDate]
		FROM
			tbl_TestCase t
		WHERE
			[TestSuiteName] = @TestSuiteName
			AND [TestRunName] = @TestRunName
			AND [TestCaseName] = @TestCaseName
		GROUP BY
			[TestCaseName], [TestCaseSteps]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH