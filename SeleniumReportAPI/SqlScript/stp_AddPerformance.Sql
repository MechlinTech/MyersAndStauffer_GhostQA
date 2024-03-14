CREATE OR ALTER   PROCEDURE [dbo].[stp_AddPerformance]
@RootId         int,
@TestCaseName	NVARCHAR(MAX),
@FileName       NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddPerformance
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	13th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddPerformance 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_PerformanceFile] ([RootId], [TestCaseName], [FileName]) 
		VALUES (@RootId, @TestCaseName, @FileName)
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