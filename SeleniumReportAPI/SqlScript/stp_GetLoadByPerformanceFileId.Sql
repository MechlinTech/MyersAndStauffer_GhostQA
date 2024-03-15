CREATE OR ALTER PROCEDURE [dbo].[stp_GetLoadByPerformanceFileId]
@PerformanceFileId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetLoadByPerformanceFileId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetLoadByPerformanceFileId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_Load WHERE PerformanceFileId = @PerformanceFileId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [Id], 
                   ISNULL([PerformanceFileId], '') AS [PerformanceFileId],
                   ISNULL([TotalUsers], '') AS [TotalUsers],
				   ISNULL([DurationInMinutes], '') AS [DurationInMinutes],
				   ISNULL([RampUpTimeInSeconds], '') AS [RampUpTimeInSeconds],
				   ISNULL([RampUpSteps], '') AS [RampUpSteps]
            FROM tbl_Load
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