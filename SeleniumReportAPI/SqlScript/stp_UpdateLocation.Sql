CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateLocation]
@Id                   INT,
@Name                 VARCHAR(100),
@NumberUser           INT,
@PercentageTraffic    DECIMAL(18,2)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateLocation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	28th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateLocation 
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_PerformanceLocation WHERE [Id] = @Id)
	BEGIN
		UPDATE tbl_PerformanceLocation
		SET [Name]              = @Name,
			[NumberUser]        = @NumberUser,
            [PercentageTraffic] = @PercentageTraffic
			WHERE [Id] = @Id
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message]
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
	END
END TRY
BEGIN CATCH
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH