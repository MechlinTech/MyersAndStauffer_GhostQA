CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateTestStepData]
@testStepJson			NVARCHAR(MAX),
@TableName				VARCHAR(100),
@testSuite				VARCHAR(100),
@testRun				VARCHAR(100),
@testCase				VARCHAR(100)
AS
BEGIN TRY
	DECLARE @SQLQuery NVARCHAR(MAX)
	SET @SQLQuery = 'UPDATE '+ @TableName + CHAR(13)
	SET @SQLQuery += 'SET [TestCaseSteps] = ''' + @testStepJson + '''' + CHAR(13)
	SET @SQLQuery += 'WHERE [TestSuiteName] = ''' + @testSuite + ''' AND [TestRunName] = ''' + @testRun + ''' AND [TestCaseName] = ''' + @testCase + ''''

	PRINT @SqlQuery
	EXEC sp_executesql @SqlQuery
END TRY
BEGIN CATCH
	INSERT INTO tbl_log
	SELECT ERROR_LINE(), ERROR_MESSAGE(), ERROR_SEVERITY()
END CATCH