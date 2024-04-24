CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestStepsDetailByTestCaseId]
@TestCaseId           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestStepsDetailByTestCaseId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	21st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestStepsDetailByTestCaseId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_CypressTestExecution WHERE [TestCaseId] = @TestCaseId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT ISNULL([TestScreenShotUrl], '') AS [TestScreenShotUrl]
            FROM tbl_CypressTestExecution
            WHERE [TestCaseId] = @TestCaseId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'Test Case Id not found' AS [message]
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