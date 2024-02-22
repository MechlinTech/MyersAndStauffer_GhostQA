
CREATE OR ALTER PROCEDURE [dbo].[stp_GetDashBoardChartDetails]
@TestSuitName			VARCHAR(100),
@Days					int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetDashBoardChartDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_stp_GetDashBoardChartDetails 'Mississippi','@Days'
**************************************************************************************/
BEGIN TRY
    SELECT [DashBoardDetailsJson] = JSON_QUERY((
	SELECT  DISTINCT CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) AS [TestRunStartDate],
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
		  --AND CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) >= CAST(DATEADD(DAY,-@Days,GETDATE()) AS DATE)
	GROUP BY t.[TestSuitename], [TestRunStartDateTime]
	ORDER BY CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) DESC
	FOR JSON PATH))
END TRY
BEGIN CATCH

END CATCH
