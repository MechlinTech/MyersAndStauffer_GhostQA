CREATE OR ALTER   PROCEDURE [dbo].[stp_GetTestDataByPerformanceFileId]
@PerformanceFileId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestDataByPerformanceFileId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestDataByPerformanceFileId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_TestData WHERE PerformanceFileId = @PerformanceFileId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [Id], 
                   ISNULL([PerformanceFileId], '') AS [PerformanceFileId],
                   ISNULL([Name], '') AS [Name],
				   ISNULL([JsonData], '') AS [JsonData],
				   ISNULL( [FilePath], '') AS [FilePath]
            FROM tbl_TestData
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