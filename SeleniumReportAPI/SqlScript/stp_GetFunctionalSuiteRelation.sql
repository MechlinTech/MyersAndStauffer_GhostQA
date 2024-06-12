CREATE OR ALTER PROCEDURE [dbo].[stp_GetFunctionalSuiteRelation]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetFunctionalSuiteRelation
CREATED BY		:	Lokesh
CREATED DATE	:	11th June, 2024	
PROC EXEC		:	EXEC stp_GetFunctionalSuiteRelation
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT
			[Id] AS [id],
			ISNULL([Parent], '') AS [parentId],
			ISNULL([Name], '') AS [name]
		FROM [dbo].[tbl_FunctionalSuiteRelation]
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [RootRelation]
END CATCH