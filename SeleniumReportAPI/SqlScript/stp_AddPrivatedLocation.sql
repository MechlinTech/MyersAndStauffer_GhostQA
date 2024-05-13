CREATE OR ALTER PROCEDURE [dbo].[stp_AddPrivatedLocation]
@LocationId           INT,
@CountryName	      NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddPrivatedLocation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	10th May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddPrivatedLocation 
				
**************************************************************************************/
BEGIN TRY
 IF EXISTS( SELECT 1 FROM [dbo].[tbl_Location] WHERE [CountryName] = @CountryName AND [LocationId] = @LocationId)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Country Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_Location] ([CountryName], [LocationId]) 
		VALUES (@CountryName, @LocationId)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], 'successfully Added' [message]
			FOR JSON PATH,WITHOUT_ARRAY_WRAPPER 
			))
		END
		ELSE
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'fail' [status], CAST(@@ERROR AS NVARCHAR(20)) [message]
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
			))
		END
	END
END TRY
BEGIN CATCH
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH