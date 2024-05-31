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
			CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss')AS DATE) AS [TestCaseStartDate],
			CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss')AS TIME) AS [TestCaseStartTime],
			CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS DATE) AS [TestCaseEndDate],
			CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS TIME) AS [TestCaseEndTime]
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