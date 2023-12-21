CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetails]
@TestSuitName			VARCHAR(100),
@TestRunId				VARCHAR(100)
AS
BEGIN TRY
	SELECT 
		COUNT(1) [TotalTestCases],
		SUM(CASE WHEN [TestCaseStatus] LIKE '%Pass%' THEN 1 ELSE 0 END) [PassedTestCases],
		SUM(CASE WHEN [TestCaseStatus] LIKE '%Fail%' THEN 1 ELSE 0 END) [FailedTestCases]
	FROM tbl_TestCase
	WHERE [TestSuiteName] = @TestSuitName 
		  AND [TestRunName] = @TestRunId
END TRY
BEGIN CATCH
	SELECT 0 [TotalTestCases], 0 [PassedTestCases], 0 [FailedTestCases]
END CATCH