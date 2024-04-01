CREATE OR ALTER PROCEDURE [dbo].[stp_GetExecutePerformanceData]
@RootId             INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetExecutePerformanceData
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	27th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetExecutePerformanceData
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_PerformanceFile WHERE [RootId] = @RootId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT pf.[Id],
				   pf.[TestCaseName],
				   pf.[FilePath],
				   pf.[FileName],
				   l.PerformanceFileId,
				   l.TotalUsers,
				   l.DurationInMinutes,
				   l.RampUpSteps,
				   l.RampUpTimeInSeconds
            FROM tbl_PerformanceFile pf
			LEFT JOIN tbl_Load l ON pf.Id = l.PerformanceFileId
            WHERE [RootId] = @RootId
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