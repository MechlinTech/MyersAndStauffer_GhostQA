CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteLoad]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteLoad
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteLoad 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Load WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_Load WHERE [Id] = @Id
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
	SELECT ERROR_MESSAGE() [LoadListJson]
END CATCH
