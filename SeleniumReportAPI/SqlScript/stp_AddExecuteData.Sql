CREATE OR ALTER PROCEDURE [dbo].[stp_AddExecuteData]
@TestSuite                VARCHAR(100),
@TestCase	              VARCHAR(100),
@TestCaseName	          VARCHAR(100),
@Status  			      VARCHAR(10),
@StartDateTime            VARCHAR(50),
@EndDateTime              VARCHAR(50),
@TestStepJson			  NVARCHAR(MAX),
@SuiteDuration			  VARCHAR(10),
@TestDuration			  VARCHAR(10),
@TestScreenShot			  NVARCHAR(MAX),
@TesterName				  VARCHAR(100),
@TestVideoUrl			  NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddExecuteData
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	20th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddExecuteData
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_InternalTestExecutions] ([TestSuite], [TestCase], [TestCaseName], [Status], [StartDateTime],
		[EndDateTime], [TestStepJson], [SuiteDuration], [TestDuration], [TestScreenShotUrl], [TesterName], [TestVideoUrl]) 
		VALUES (@TestSuite, @TestCase, @TestCaseName, @Status, @StartDateTime, @EndDateTime, @TestStepJson, @SuiteDuration, @TestDuration,
		@TestScreenShot, @TesterName, @TestVideoUrl)
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