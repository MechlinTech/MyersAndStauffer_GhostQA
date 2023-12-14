CREATE OR ALTER PROCEDURE [dbo].[stp_GetRunIDs]
@TestSuitName VARCHAR(100)
AS
BEGIN TRY
	SELECT DISTINCT [TestSuiteName], [TestRunName], [TestRunStartDateTime]
		FROM tbl_TestCase
	WHERE [TestSuiteName] = @TestSuitName
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH