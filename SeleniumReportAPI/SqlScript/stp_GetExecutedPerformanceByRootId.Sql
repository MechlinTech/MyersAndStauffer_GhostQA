CREATE OR ALTER  PROCEDURE [dbo].[stp_GetExecutedPerformanceByRootId]
@RootId          INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetExecutedPerformanceByRootId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	29th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetExecutedPerformanceByRootId 2
**************************************************************************************/
BEGIN TRY
    IF EXISTS(SELECT 1 FROM tbl_CypressPerfomanceDetaills WHERE RootId = @RootId)
    BEGIN
        SELECT [RunDetailsJson] = JSON_QUERY ((
            SELECT DISTINCT FORMAT(CAST(t.[StartDateTime] AS DATETIMEOFFSET), 'MMMM dd') AS [TestRunDate],
                   [RunDetails] = JSON_QUERY ((
                        SELECT
                               t1.[RootId],
                               t1.[Name],
                               t1.[RunId],
                               t1.[StartDateTime],
                               t1.[EndDateTime],
                               t1.[TesterName],
                               t1.[Status]
                        FROM tbl_CypressPerfomanceDetaills t1
                        WHERE RootId = @RootId
                            AND FORMAT(CAST(t1.[StartDateTime] AS DATETIMEOFFSET), 'MMMM dd') = FORMAT(CAST(t.[StartDateTime] AS DATETIMEOFFSET), 'MMMM dd')
                        GROUP BY t1.[RunId], t1.[Name], t1.RootId, t1.StartDateTime, t1.EndDateTime, t1.TesterName, t1.Status
                        ORDER BY MIN(CAST(t1.[StartDateTime] AS DATETIMEOFFSET)) DESC
                        FOR JSON PATH
                    ))
            FROM tbl_CypressPerfomanceDetaills t
            WHERE RootId = @RootId
            ORDER BY [TestRunDate] DESC
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [RunDetailsJson] = JSON_QUERY((
            SELECT 'success' AS [status],
                   'No data exist for this RootId' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [RunDetailsJson] = JSON_QUERY((
        SELECT 'fail' AS [status],
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH