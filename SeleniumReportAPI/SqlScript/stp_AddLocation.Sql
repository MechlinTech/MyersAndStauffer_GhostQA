CREATE OR ALTER   PROCEDURE [dbo].[stp_AddLocation]
@PerformanceFileId    INT,
@Name	              NVARCHAR(MAX),
@NumberUser	          INT,
@PercentageTraffic    DECIMAL(18,2)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddLocation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	13th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddLocation 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_PerformanceLocation] ([PerformanceFileId],[Name], [NumberUser], [PercentageTraffic]) 
		VALUES (@PerformanceFileId, @Name, @NumberUser, @PercentageTraffic)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], 'Added Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT Id [id], [PerformanceFileId] [performanceFileId], [Name] [name],[NumberUser] [numberUser],[PercentageTraffic]
						[percentageTraffic]
						FROM tbl_PerformanceLocation where [Id] = SCOPE_IDENTITY()
						FOR JSON PATH
					))
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