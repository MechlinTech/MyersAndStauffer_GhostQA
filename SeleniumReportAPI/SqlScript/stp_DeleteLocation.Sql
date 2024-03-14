CREATE OR ALTER   PROCEDURE [dbo].[stp_DeleteLocation]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteLocation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	14th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteLocation 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_PerformanceLocation WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_PerformanceLocation WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Location not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Location Deleted Successfully' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], CAST(@@ERROR AS NVARCHAR(20)) [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [LocationListJson]
END CATCH