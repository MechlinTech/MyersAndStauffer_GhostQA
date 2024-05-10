CREATE OR ALTER PROCEDURE [dbo].[stp_GetLocation]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetLocation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15 March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetLocation
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id],
			   [CountryName] as [Name],
			   [LocationId]
		FROM tbl_Location
		ORDER BY CountryName
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [result]
END CATCH