CREATE OR ALTER PROCEDURE [dbo].[stp_DeletePerformanceFile]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeletePerformanceFile
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	13th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeletePerformanceFile 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_PerformanceLocation WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_PerformanceLocation WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Performance File not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Performance File Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [performanceFileListJson]
END CATCH
