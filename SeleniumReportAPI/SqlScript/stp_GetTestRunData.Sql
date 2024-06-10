CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestRunData]
@TestSuitName	VARCHAR(100),
@TestRunName	VARCHAR(100),
@TimeZone		VARCHAR(100) = 'India Standard Time'
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestRunData
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	23th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestRunData 'Mississippi', 'TestRun-33'
**************************************************************************************/
BEGIN TRY
	SELECT [RunDetailsJson] = JSON_QUERY ((
										SELECT
												t1.[TestSuiteName],
												t1.[TestRunName],
												FORMAT(MIN(CAST(t1.[TestSuiteStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone),'dd-MMM-yyyy HH:mm:ss') AS [TestSuiteStartDateTime],
												FORMAT(MAX(CAST(t1.[TestSuiteEndDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone), 'dd-MMM-yyyy HH:mm:ss') AS [TestSuiteEndDateTime],
												FORMAT(MIN(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone),'dd-MMM-yyyy HH:mm:ss') AS [TestRunStartDateTime],
												FORMAT(MAX(CAST(t1.[TestRunEndDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone), 'dd-MMM-yyyy HH:mm:ss') AS [TestRunEndDateTime],
												COUNT(t1.[TestCaseName]) AS [TotalTestCases],
												(SELECT COUNT([TestCaseStatus]) FROM tbl_TestCase WHERE [TestCaseStatus] LIKE '%Passed%' AND [TestSuiteName] = t1.[TestSuiteName] AND [TestRunName] = t1.[TestRunName]) AS [PassedTestCases],
												(SELECT COUNT([TestCaseStatus]) FROM tbl_TestCase WHERE [TestCaseStatus] LIKE '%Failed%' AND [TestSuiteName] = t1.[TestSuiteName] AND [TestRunName] = t1.[TestRunName]) AS [FailedTestCases],
												CASE
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) = 0 THEN 'Failed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) = 0 THEN 'Passed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) >
														 SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) THEN 'Partially Passed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) <
														 SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) THEN 'Partially Failed'
													ELSE 'Partially Passed'
												END AS [TestRunStatus]
											FROM
												tbl_TestCase t1
											WHERE
												t1.[TestSuiteName] = @TestSuitName
												AND t1.TestRunName = @TestRunName
											GROUP BY t1.[TestSuiteName], t1.[TestRunName]
											ORDER BY MIN(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET)) DESC
											FOR JSON PATH , WITHOUT_ARRAY_WRAPPER 
											))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH