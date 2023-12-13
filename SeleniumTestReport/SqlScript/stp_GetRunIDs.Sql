CREATE OR ALTER PROCEDURE [dbo].[stp_GetRunIDs]
@TestSuitName VARCHAR(100)
AS
BEGIN TRY
	SELECT DISTINCT [TestSuiteName],[Runid], [StartDate]
	FROM tbl_TestCase
		WHERE [TestSuiteName] = @TestSuitName
	GROUP BY [Startdate], [Runid], [TestSuiteName]
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH