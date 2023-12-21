CREATE OR ALTER PROCEDURE [dbo].[stp_GetRunDetails]
@TestSuitName			VARCHAR(100),
@TestRunId				VARCHAR(100)
AS
BEGIN TRY
	SELECT 
		[TestRunName], [TestCaseName], [TestCaseStatus], [TestFailureMessage]
		, [TestFailureScreenShot], [TestCaseVideoURL]
		, [TestRunStartDateTime], [TestRunEndDateTime],	[TestCaseSteps]
	FROM tbl_TestCase
	WHERE [TestSuiteName] = @TestSuitName
		  AND [TestRunName] = @TestRunId
END TRY
BEGIN CATCH
	SELECT ERROR_LINE() [ERROR_LINE], ERROR_MESSAGE() [ERROR_MESSAGE]
END CATCH