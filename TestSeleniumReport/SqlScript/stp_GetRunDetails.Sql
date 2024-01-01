CREATE OR ALTER PROCEDURE [dbo].[stp_GetRunDetails]
@TestSuitName VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetRunDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	20 Dec 2023
MODIFIED BY		:	Mohammad Mobin
MODIFIED DATE	:	26 Dec 2023
PROC EXEC		:
				EXEC stp_GetRunDetails 'Mississippi'
**************************************************************************************/
BEGIN TRY
	SELECT [RunDetailsJson] = JSON_QUERY ((
		SELECT DISTINCT FORMAT(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET), 'MMMM dd') [TestRunDateYear]
			   , [RunDetails] = JSON_QUERY ((
											SELECT
												t1.[TestSuiteName],
												t1.[TestRunName],
												MIN(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET)) AS [TestRunStartDateTime],
												MAX(CAST(t1.[TestRunEndDateTime] AS DATETIMEOFFSET)) AS [TestRunEndDateTime],
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
												t1.[TestSuiteName] = t.[TestSuiteName]
												AND FORMAT(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET), 'MMMM dd') = FORMAT(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET), 'MMMM dd')
											GROUP BY t1.[TestSuiteName], t1.[TestRunName]
											ORDER BY MIN(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET)) DESC
											FOR JSON PATH
											))
		FROM tbl_TestCase t
		WHERE [TestSuiteName] = @TestSuitName
		ORDER BY [TestRunDateYear] DESC
		FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH