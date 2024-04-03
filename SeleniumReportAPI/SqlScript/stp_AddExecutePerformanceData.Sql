CREATE OR ALTER PROCEDURE [dbo].[stp_AddExecutePerformanceData]
@RootId                   INT,
@Name	                  VARCHAR(100),
@RunId                    VARCHAR(100),
@Status  			      VARCHAR(10) = NULL,
@StartDateTime            VARCHAR(50),
@EndDateTime              VARCHAR(50),
@LoadDataJson			  NVARCHAR(MAX) = NULL,
@LocationDataJson		  NVARCHAR(MAX) = NULL,
@TestDataJson			  NVARCHAR(MAX) = NULL,
@PropertyDataJson		  NVARCHAR(MAX) = NULL,
@TesterName				  VARCHAR(100),
@MaxDuration			  INT,
@Scenarios			     VARCHAR(MAX),
@TotalDuration			 INT,
@TotalRampUpSteps		 INT,
@TotalRampUpTime		 INT,
@TotalUser			     INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddExecutePerformanceData
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	28th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddExecutePerformanceData
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_CypressPerfomanceDetaills] ([RootId], [Name], [RunId], [StartDateTime],
		[EndDateTime], [LoadDataJson], [TesterName], [Status], [LoactionDataJson], [TestDataJson], [PropertyDataJson], [MaxDuration], [Scenarios], [TotalDuration], [TotalRampUpSteps], [TotalRampUpTime], [TotalUser]) 
		VALUES (@RootId, @Name, @RunId, @StartDateTime, @EndDateTime, @LoadDataJson, @TesterName, @Status, @LocationDataJson, @TestDataJson,
		@PropertyDataJson, @MaxDuration, @Scenarios, @TotalDuration, @TotalRampUpSteps, @TotalRampUpTime, @TotalUser)
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