CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetailsByTestDetailId]
@TestDetailId              INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseDetailsByTestDetailId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22nd March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestCaseDetailsByTestDetailId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_TestCaseDetails WHERE [TestCaseDetailsId] = @TestDetailId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [TestCaseDetailsId], 
                   ISNULL([RootId], '') AS [RootId],
				   ISNULL([StartUrl], '') AS [StartUrl],
                   [TestCaseName]
            FROM tbl_TestCaseDetails
            WHERE [TestCaseDetailsId] = @TestDetailId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'TestCaseDetailsId not found' AS [message]
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
