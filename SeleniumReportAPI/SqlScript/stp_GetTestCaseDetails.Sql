CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetails]
@TestSuiteName			VARCHAR(100),
@TestRunId				VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	20 Dec 2023
MODIFIED BY		:	Mohammad Mobin
MODIFIED DATE	:	26 Dec 2023
PROC EXEC		:
				EXEC stp_GetTestCaseDetails 'Mississippi', 'TestRun-1'
**************************************************************************************/
BEGIN TRY
    SELECT [TestCaseDetailsJson] = JSON_QUERY((
            SELECT t.[TestSuiteName], t.[TestRunName], t.[TestEnvironment], t.[TesterName]
				, COUNT(t.TestCaseName) [TotalTestCases],
                SUM(CASE WHEN t.[TestCaseStatus] LIKE '%Pass%' THEN 1 ELSE 0 END) [PassedTestCases],
                SUM(CASE WHEN t.[TestCaseStatus] LIKE '%Fail%' THEN 1 ELSE 0 END) [FailedTestCases],
				CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss')AS DATE) AS [TestRunStartDate],
				CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss')AS TIME) AS [TestRunStartTime],
				CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS DATE) AS [TestRunEndDate],
				CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS TIME) AS [TestRunEndTime],
                JSON_QUERY((
                        SELECT t1.[TestSuiteName], t1.[TestRunName], t1.[TestCaseName], t1.[TestCaseStatus]
                            , t1.[TestCaseVideoURL]
                            , CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) [TestRunStartDateTime]
                            , CAST(t1.[TestRunEndDateTime] AS DATETIMEOFFSET) [TestRunEndDateTime]
                        FROM tbl_TestCase t1
                        WHERE t1.[TestSuiteName] = t.[TestSuiteName]
                              AND t1.[TestRunName] = t.[TestRunName]
                        FOR JSON PATH
                    )) [TestCaseDetailsList]
            FROM tbl_TestCase t
            WHERE [TestSuiteName] = @TestSuiteName 
                  AND [TestRunName] = @TestRunId
            GROUP BY t.[TestSuiteName], t.[TestRunName], t.[TestEnvironment], t.[TesterName]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
END TRY
BEGIN CATCH
    SELECT ERROR_MESSAGE() [ERROR_MESSAGE]
END CATCH
