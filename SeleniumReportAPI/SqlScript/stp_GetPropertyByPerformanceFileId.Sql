CREATE OR ALTER    PROCEDURE [dbo].[stp_GetPropertyByPerformanceFileId]
@PerformanceFileId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetPropertyByPerformanceFileId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	14th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetPropertyByPerformanceFileId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_PerformanceProperties WHERE PerformanceFileId = @PerformanceFileId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [Id], 
                   ISNULL([PerformanceFileId], '') AS [PerformanceFileId],
                   ISNULL([Name], '') AS [Name],
				   ISNULL([Value], '') AS [Value]
            FROM tbl_PerformanceProperties
            WHERE PerformanceFileId = @PerformanceFileId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'PerformanceFileId not found' AS [message]
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