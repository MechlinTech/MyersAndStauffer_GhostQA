CREATE OR ALTER PROCEDURE [dbo].[stp_GetRunIDs]
@TestSuitName VARCHAR(100)
AS
BEGIN TRY
	SELECT
    [TestSuiteName],
    [TestRunName],
    MIN([TestRunStartDateTime]) AS [TestRunStartDateTime],
    MAX([TestRunEndDateTime]) AS [TestRunEndDateTime],
    COUNT([TestCaseName]) AS [TotalTestCases],
    CASE
        WHEN SUM(CASE WHEN [TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) = 0 THEN 'Failed'
        WHEN SUM(CASE WHEN [TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) = 0 THEN 'Passed'
        WHEN SUM(CASE WHEN [TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) >
             SUM(CASE WHEN [TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) THEN 'Partially Passed'
        WHEN SUM(CASE WHEN [TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) <
             SUM(CASE WHEN [TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) THEN 'Partially Failed'
    END AS [TestRunStatus]
	FROM
		tbl_TestCase
	WHERE
		[TestSuiteName] = @TestSuitName
	GROUP BY
		[TestSuiteName], [TestRunName]
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH