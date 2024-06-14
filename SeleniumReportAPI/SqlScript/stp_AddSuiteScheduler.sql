CREATE OR ALTER PROCEDURE [dbo].[stp_AddSuiteScheduler]
@RecurringInterval             NVARCHAR(MAX),
@Interval					   NVARCHAR(MAX),
@SuiteName					   NVARCHAR(MAX),
@StartTime					   NVARCHAR(MAX),
@EndTime					   NVARCHAR(MAX),
@CreatedBy	                   NVARCHAR(MAX),
@CroneExpression			   NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddSuiteScheduler
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	13th June 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddSuiteScheduler 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_SuiteScheduleInfo] ([RecurringInterval], [Interval], [SuiteName], [StartTime], [EndTime],  [CreatedBy], [CreatedOn], [ModifyBy], [ModifyOn], [CroneExpression]) 
		VALUES (@RecurringInterval, @Interval, @SuiteName, @StartTime, @EndTime, @CreatedBy, GETDATE(), NULL, NULL, @CroneExpression)
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
