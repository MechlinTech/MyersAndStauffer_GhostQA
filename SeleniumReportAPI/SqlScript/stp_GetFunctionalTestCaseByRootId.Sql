CREATE OR ALTER PROCEDURE [dbo].[stp_GetFunctionalTestCaseByRootId]
@RootId       INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetFunctionalTestCaseByRootId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetFunctionalTestCaseByRootId 1
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_FunctionalTestCase WHERE RootId = @RootId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [Id], 
                   [RootId],
                   [TestCaseName],
				   [Status],
				   [UpdatedOn]
            FROM tbl_FunctionalTestCase
            WHERE RootId = @RootId
            FOR JSON PATH, INCLUDE_NULL_VALUES
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