CREATE OR ALTER PROCEDURE [dbo].[stp_GetDashBoardChartDetails]
@TestSuitName			VARCHAR(100),
@FilterType				VARCHAR(100),
@FilterValue			INT = 7,
@TimeZone				VARCHAR(100) = 'India Standard Time'
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetDashBoardChartDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC [stp_GetDashBoardChartDetails] 'Mississippi', 'days' , 18
**************************************************************************************/
BEGIN TRY
    DECLARE @SQLQuery NVARCHAR(MAX)

    SET @SQLQuery = '
		WITH TestRuns AS (
			SELECT 
				CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''') AS DATETIME) AS [TestRunStartDate],
				t.[TestSuiteName],
				t.[TestRunName],
				t.[TestCaseStatus]
			FROM tbl_TestCase (NOLOCK) t
			WHERE t.[TestSuiteName] = ''' + @TestSuitName + '''
		)

        SELECT [DashBoardDetailsJson] = JSON_QUERY((
            SELECT TOP ' + CAST(@FilterValue AS NVARCHAR(10)) + ' 
				Cast(tr.[TestRunStartDate] As Date) [TestRunStartDate],
				tr.[TestRunName],
				CASE WHEN tr.TestRunName LIKE ''%TestRun%'' THEN ''Custom'' ELSE ''In-Built'' END AS SuiteType,
				tr.[TestSuiteName],
				(
					SELECT COUNT(t1.[TestRunName])
					FROM tbl_TestCase (NOLOCK) t1
					WHERE t1.[TestSuiteName] = tr.[TestSuiteName]
							AND t1.TestRunName = tr.TestRunName
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''') AS DATE) 
							= CAST(tr.[TestRunStartDate] AS DATE)
				) AS [TotalTestCase],
				(
					SELECT COUNT(t1.[TestRunName])
					FROM tbl_TestCase (NOLOCK) t1
					WHERE t1.[TestSuiteName] = tr.[TestSuiteName]
							AND t1.TestRunName = tr.TestRunName
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''') AS DATE) 
							= CAST(tr.[TestRunStartDate] AS DATE)
							AND t1.[TestCaseStatus] LIKE ''%Passed%''
				) AS [TotalPassedTestCase],
				(
					SELECT COUNT(t1.[TestRunName])
					FROM tbl_TestCase (NOLOCK) t1
					WHERE t1.[TestSuiteName] = tr.[TestSuiteName]
							AND t1.TestRunName = tr.TestRunName
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE ''' + @TimeZone + ''') AS DATE) 
							= CAST(tr.[TestRunStartDate] AS DATE)
							AND t1.[TestCaseStatus] LIKE ''%Failed%''
				) AS [TotalFailedTestCase]
			FROM TestRuns tr
				GROUP BY
					tr.[TestSuitename],
					tr.[TestRunName],
					Cast(tr.[TestRunStartDate] As Date)
				ORDER BY 
					tr.[TestRunName], Cast(tr.[TestRunStartDate] As Date) DESC
        FOR JSON PATH))'
	PRINT @SQLQuery

    IF @FilterType = 'runs'
        EXEC sp_executesql @SQLQuery
    ELSE
		WITH TestRuns AS (
			SELECT 
				CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATETIME) AS [TestRunStartDate],
				t.[TestSuiteName],
				t.[TestRunName],
				t.[TestCaseStatus]
			FROM tbl_TestCase (NOLOCK) t
			WHERE t.[TestSuiteName] = @TestSuitName
		)

        SELECT [DashBoardDetailsJson] = JSON_QUERY((
            SELECT CAST(tr.[TestRunStartDate] AS DATE) [TestRunStartDate],
				tr.[TestRunName],
				CASE WHEN tr.TestRunName LIKE '%TestRun%' THEN 'Custom' ELSE 'In-Built' END AS SuiteType,
				tr.[TestSuiteName],
				(
					SELECT COUNT(t1.[TestRunName])
					FROM tbl_TestCase (NOLOCK) t1
					WHERE t1.[TestSuiteName] = tr.[TestSuiteName]
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) 
							= CAST(tr.[TestRunStartDate] AS DATE)
				) AS [TotalTestCase],
				(
					SELECT COUNT(t1.[TestRunName])
					FROM tbl_TestCase (NOLOCK) t1
					WHERE t1.[TestSuiteName] = tr.[TestSuiteName]
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) 
							= CAST(tr.[TestRunStartDate] AS DATE)
							AND t1.[TestCaseStatus] LIKE '%Passed%'
				) AS [TotalPassedTestCase],
				(
					SELECT COUNT(t1.[TestRunName])
					FROM tbl_TestCase (NOLOCK) t1
					WHERE t1.[TestSuiteName] = tr.[TestSuiteName]
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) 
							= CAST(tr.[TestRunStartDate] AS DATE)
							AND t1.[TestCaseStatus] LIKE '%Failed%'
				) AS [TotalFailedTestCase]
			FROM TestRuns tr
			WHERE CAST(tr.[TestRunStartDate] AS DATE) >= CAST(DATEADD(DAY, -@FilterValue, GETDATE() AT TIME ZONE @TimeZone) AS DATE)
			GROUP BY tr.[TestSuiteName], tr.[TestRunName], Cast(tr.[TestRunStartDate] As Date)
			ORDER BY tr.[TestRunName], Cast(tr.[TestRunStartDate] As Date) DESC
        FOR JSON PATH))
END TRY
BEGIN CATCH
    -- Add error handling logic here
END CATCH
