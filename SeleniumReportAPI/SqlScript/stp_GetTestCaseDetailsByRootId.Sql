CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetailsByRootId]
@RootId int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseDetailsByRootId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	4th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestCaseDetailsByRootId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_TestCaseDetails WHERE RootId = @RootId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [TestCaseDetailsId], 
                   ISNULL([RootId], '') AS [RootId],
				   ISNULL([StartUrl], '') AS [StartUrl],
                   [TestCaseName],
				   (SELECT StartDateTime FROM tbl_CypressTestExecution tcte WHERE  TestCaseDetailsId = tcd.TestCaseDetailsId AND Id = (SELECT MAX(Id) from tbl_CypressTestExecution WHERE  TestCaseDetailsId = tcd.TestCaseDetailsId)) StartDateTime,
				   (SELECT [Status] FROM tbl_CypressTestExecution tcte WHERE  TestCaseDetailsId = tcd.TestCaseDetailsId AND Id = (SELECT MAX(Id) from tbl_CypressTestExecution WHERE  TestCaseDetailsId = tcd.TestCaseDetailsId)) [Status]
            FROM tbl_TestCaseDetails tcd
            WHERE RootId = @RootId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'RootId not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
