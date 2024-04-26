CREATE OR ALTER PROCEDURE [dbo].[stp_GetProjectRootRelation]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetProjectRootRelation
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id] AS [id],
               ISNULL([ParentId], '') AS [parentId],
               ISNULL([Name], '') AS [name]
		FROM tbl_ProjectRootRelation
		ORDER BY Id DESC
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [ProjectRootRelation]
END CATCH