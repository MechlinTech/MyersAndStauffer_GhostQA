CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetails]
@TestSuitName			VARCHAR(100),
@TestRunId				VARCHAR(100)
AS
BEGIN TRY
	DECLARE @TotalTestCases INT, @PassedTestCases INT, @FailedTestCases INT
	SELECT @TotalTestCases = COUNT(1) 
		FROM tbl_TestCase
	WHERE [TestSuiteName] = @TestSuitName 
		  AND [Runid] = @TestRunId

	SELECT @PassedTestCases = COUNT(1) 
		FROM tbl_TestCase
	WHERE [TestSuiteName] = @TestSuitName 
		  AND [Runid] = @TestRunId
		  AND [TestCaseStatus] LIKE '%Pass%'

	SELECT @FailedTestCases = COUNT(1) 
		FROM tbl_TestCase
	WHERE [TestSuiteName] = @TestSuitName 
		  AND [Runid] = @TestRunId
		  AND [TestCaseStatus] LIKE '%Fail%'
	SELECT @TotalTestCases [TotalTestCases], @PassedTestCases [PassedTestCases], @FailedTestCases [FailedTestCases]
END TRY
BEGIN CATCH
	SELECT 0 [TotalTestCases], 0 [PassedTestCases], 0 [FailedTestCases]
END CATCH