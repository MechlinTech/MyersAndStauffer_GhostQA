CREATE OR  ALTER PROCEDURE [dbo].[stp_DeletePrivateLocation]
@LocationId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeletePrivateLocation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	10th May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeletePrivateLocation 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Location WHERE [LocationId] = @LocationId)
	BEGIN
		DELETE FROM tbl_Location WHERE [LocationId] = @LocationId
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Private Location is not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Private Location Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [TestRun]
END CATCH