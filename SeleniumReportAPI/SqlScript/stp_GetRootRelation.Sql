CREATE OR ALTER   PROCEDURE [dbo].[stp_GetRootRelation]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetRootRelation
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [RootId], 
		       ISNULL([Node], '') AS [Node],
               ISNULL([Parent], '') AS [Parent],
               ISNULL([Name], '') AS [Name]
		FROM tbl_RootRelation
		ORDER BY RootId DESC
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [RootRelation]
END CATCH