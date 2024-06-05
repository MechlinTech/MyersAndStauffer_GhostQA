CREATE OR ALTER PROCEDURE [dbo].[stp_GetRunDetails]
@TestSuitName		VARCHAR(100),
@TimeZone			VARCHAR(100) = 'India Standard Time'
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
	DECLARE @DynamicSQL NVARCHAR(MAX)
	
SET @DynamicSQL = '
-- Check if the temporary table exists and drop it if it does
IF OBJECT_ID(''tempdb..#tbl_TestCase'') IS NOT NULL
BEGIN
	DROP TABLE #tbl_TestCase;
END;

-- Create a temporary table to store intermediate results
CREATE TABLE #tbl_TestCase
(
	TestRunDateYear			DATE,
	TestRunDateString		VARCHAR(100)
);
-- Insert data into the temporary table
INSERT INTO #tbl_TestCase (TestRunDateYear, TestRunDateString)
SELECT DISTINCT CAST(FORMAT((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + '''), ''MMMM dd yyyy'') AS DATE) AS TestRunDateYear,
				FORMAT((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + '''), ''MMMM dd yyyy'') AS TestRunDateString
FROM tbl_TestCase (NOLOCK) t
WHERE t.TestSuiteName = ''' + @TestSuitName + ''';

SELECT [RunDetailsJson] = JSON_QUERY ((
	SELECT t.TestRunDateYear
		, [RunDetails] = JSON_QUERY((
				SELECT
					t1.[TestSuiteName],
					t1.[TestRunName],
					CAST(MIN((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''')) AS DATE) AS [TestRunStartDate],
					CAST(MAX((CAST(t1.[TestRunEndDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''')) AS DATE) AS [TestRunEndDate],
					CONVERT(VARCHAR(8), CAST(MIN((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''')) AS TIME), 108) AS [TestRunStartTime],
					CONVERT(VARCHAR(8), CAST(MAX((CAST(t1.[TestRunEndDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''')) AS TIME), 108) AS [TestRunEndTime],
					COUNT(t1.[TestCaseName]) AS [TotalTestCases],
					(SELECT COUNT([TestCaseStatus]) FROM tbl_TestCase WHERE [TestCaseStatus] LIKE ''%Passed%'' AND [TestSuiteName] = t1.[TestSuiteName] AND [TestRunName] = t1.[TestRunName]) AS [PassedTestCases],
					(SELECT COUNT([TestCaseStatus]) FROM tbl_TestCase WHERE [TestCaseStatus] LIKE ''%Failed%'' AND [TestSuiteName] = t1.[TestSuiteName] AND [TestRunName] = t1.[TestRunName]) AS [FailedTestCases],
					CASE
						WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE ''%Passed%'' THEN 1 ELSE 0 END) = 0 THEN ''Failed''
						WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE ''%Failed%'' THEN 1 ELSE 0 END) = 0 THEN ''Passed''
						WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE ''%Passed%'' THEN 1 ELSE 0 END) >
								SUM(CASE WHEN t1.[TestCaseStatus] LIKE ''%Failed%'' THEN 1 ELSE 0 END) THEN ''Partially Passed''
						WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE ''%Passed%'' THEN 1 ELSE 0 END) <
								SUM(CASE WHEN t1.[TestCaseStatus] LIKE ''%Failed%'' THEN 1 ELSE 0 END) THEN ''Partially Failed''
						ELSE ''Partially Passed''
					END AS [TestRunStatus]
				FROM tbl_TestCase (NOLOCK) t1
					WHERE t1.TestSuiteName = ''' + @TestSuitName + ''' 
					AND FORMAT((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + '''), ''MMMM dd yyyy'') = t.TestRunDateString
					GROUP BY t1.[TestSuiteName], t1.[TestRunName]
					ORDER BY MIN((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''')) DESC
				FOR JSON PATH
			))
	FROM #tbl_TestCase (NOLOCK) t
	ORDER BY CONVERT(DATE,t.TestRunDateYear) DESC
FOR JSON PATH));'

PRINT @DynamicSQL
EXECUTE SP_EXECUTESQL @DynamicSQL
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH