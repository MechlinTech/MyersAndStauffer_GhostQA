CREATE OR ALTER PROCEDURE stp_GetDashBoardDetails
@TestSuitName			VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetDashBoardDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetDashBoardDetails 'Mississippi'
**************************************************************************************/
BEGIN TRY
	SELECT [DashBoardDetailsJson] = JSON_QUERY((
		SELECT DISTINCT CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) AS [TestRunStartDate],
			   t.[TestSuitename],
			(
				SELECT COUNT(t1.[TestRunName])
				FROM tbl_TestCase t1
				WHERE t1.[TestSuiteName] = t.[TestSuiteName]
						AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
			) AS [TotalTestCase],
			(
				SELECT COUNT(t1.[TestRunName])
				FROM tbl_TestCase t1
				WHERE t1.[TestSuiteName] = t.[TestSuiteName]
						AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
						AND t1.[TestCaseStatus] LIKE '%Passed%'
			) AS [TotalPassedTestCase],
			(
				SELECT COUNT(t1.[TestRunName])
				FROM tbl_TestCase t1
				WHERE t1.[TestSuiteName] = t.[TestSuiteName]
						AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
						AND t1.[TestCaseStatus] LIKE '%Failed%'
			) AS [TotalFailedTestCase]
		FROM tbl_TestCase t
		WHERE t.[TestSuiteName] = @TestSuitName
		GROUP BY t.[TestSuitename], [TestRunStartDateTime]
		ORDER BY CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) DESC
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH