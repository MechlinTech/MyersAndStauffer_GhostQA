CREATE OR ALTER PROCEDURE [dbo].[stp_GetPerformaceFile]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetPerformaceFile
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	12th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetPerformaceFile
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id] AS [id],
               ISNULL([RootId], '') AS [rootId],
               ISNULL([TestCaseName], '') AS [testCaseName],
			   ISNULL([FileName], '') AS [fileName],
			   ISNULL( [FilePath], '') AS [FilePath]
		FROM tbl_PerformanceFile
		WHERE [RootId] = @RootId
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [PerformanceFile]
END CATCH