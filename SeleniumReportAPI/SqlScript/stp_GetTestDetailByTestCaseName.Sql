ALTER  PROCEDURE [dbo].[stp_GetTestDetailByTestCaseName]
@TestId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestDetailByTestCaseName
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	21st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestDetailByTestCaseName "1025"
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_CypressTestExecution WHERE [TestCaseDetailsId] = @TestId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [TestSuite], 
                   ISNULL([TestCaseId], '') AS [TestCase],
                   ISNULL([Status], '') AS [Status],
				   ISNULL([StartDateTime], '') AS [StartDateTime],
				   ISNULL([EndDateTime], '') AS [EndDateTime],
				   ISNULL([TestDuration], '') AS [TestDuration],
				   ISNULL([TestVideoUrl], '') AS [TestVideoUrl]
            FROM tbl_CypressTestExecution
            WHERE [TestCaseDetailsId] = @TestId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'Test Case Name not found' AS [message]
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