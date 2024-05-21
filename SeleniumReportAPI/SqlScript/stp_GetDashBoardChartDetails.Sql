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
        (SELECT [DashBoardDetailsJson] = JSON_QUERY((
            SELECT DISTINCT TOP ' + CAST(@FilterValue AS NVARCHAR(10)) + ' 
				t.[TestSuitename],
				t.[TestRunName],
				CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE) AS [TestRunStartDate],
				ISNULL((SELECT COUNT(1)
					FROM tbl_TestCase t1
					WHERE t1.[TestSuiteName] = t.[TestSuiteName]
							AND t1.[TestRunName] = t.[TestRunName]
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE) = CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE)
					GROUP BY t1.[TestRunName]
				),0) AS [TotalTestCase],
				ISNULL((SELECT COUNT(1)
					FROM tbl_TestCase t1
					WHERE t1.[TestSuiteName] = t.[TestSuiteName]
							AND t1.[TestRunName] = t.[TestRunName]
							AND t1.[TestCaseStatus] LIKE ''%Passed%''
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE) = CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE)
					GROUP BY t1.[TestRunName]
				),0) AS [TotalPassedTestCase],
				ISNULL((SELECT COUNT(1)
					FROM tbl_TestCase t1
					WHERE t1.[TestSuiteName] = t.[TestSuiteName]
							AND t1.[TestRunName] = t.[TestRunName]
							AND t1.[TestCaseStatus] LIKE ''%Failed%''
							AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE) = CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE)
					GROUP BY t1.[TestRunName]
				),0) AS [TotalFailedTestCase]
				FROM 
					tbl_TestCase t
				WHERE 
					t.[TestSuiteName] = '''+ @TestSuitName +'''
				GROUP BY
					t.[TestSuitename],
					t.[TestRunName],
					CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE)
				ORDER BY 
					CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE '''+ @TimeZone +''') AS DATE) DESC,
					t.[TestRunName] DESC
        FOR JSON PATH)))'
	PRINT @SQLQuery

    IF @FilterType = 'runs'
        EXEC sp_executesql @SQLQuery
    ELSE
        SELECT
            [DashBoardDetailsJson] = JSON_QUERY((
                SELECT DISTINCT CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) AS [TestRunStartDate],
                       t.[TestSuitename],
                    (
                        SELECT COUNT(t1.[TestRunName])
                        FROM tbl_TestCase t1
                        WHERE t1.[TestSuiteName] = t.[TestSuiteName]
                                AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) = CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE)
                    ) AS [TotalTestCase],
                    (
                        SELECT COUNT(t1.[TestRunName])
                        FROM tbl_TestCase t1
                        WHERE t1.[TestSuiteName] = t.[TestSuiteName]
                                AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) = CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE)
                                AND t1.[TestCaseStatus] LIKE '%Passed%'
                    ) AS [TotalPassedTestCase],
                    (
                        SELECT COUNT(t1.[TestRunName])
                        FROM tbl_TestCase t1
                        WHERE t1.[TestSuiteName] = t.[TestSuiteName]
                                AND CAST((CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) = CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE)
                                AND t1.[TestCaseStatus] LIKE '%Failed%'
                    ) AS [TotalFailedTestCase]
                FROM tbl_TestCase t
                WHERE t.[TestSuiteName] = @TestSuitName
                      AND CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) >= CAST(DATEADD(DAY,-@FilterValue,GETDATE() AT TIME ZONE @TimeZone) AS DATE)
                GROUP BY t.[TestSuitename], [TestRunStartDateTime]
                ORDER BY CAST((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone) AS DATE) DESC
            FOR JSON PATH))
END TRY
BEGIN CATCH
    -- Add error handling logic here
END CATCH
