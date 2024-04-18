CREATE OR ALTER PROCEDURE [dbo].[stp_GetFunctionalTest]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetFunctionalTest
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	18th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetFunctionalTest
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [RootId] AS [id], 
		       ISNULL([Node], '') AS [node],
               ISNULL([Parent], '') AS [parentId],
               ISNULL([Name], '') AS [name]
		FROM tbl_FuncationalTest
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [FuncationalTest]
END CATCH