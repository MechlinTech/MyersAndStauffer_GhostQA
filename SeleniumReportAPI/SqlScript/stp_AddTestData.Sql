CREATE OR ALTER   PROCEDURE [dbo].[stp_AddTestData]
@PerformanceFileId    INT,
@Name	              NVARCHAR(MAX),
@JsonData	          NVARCHAR(MAX),
@FilePath			  NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestData
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddTestData
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_TestData] ([PerformanceFileId],[Name], [JsonData], [FilePath]) 
		VALUES (@PerformanceFileId, @Name, @JsonData, @FilePath)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], 'Added Successfully' [message]
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