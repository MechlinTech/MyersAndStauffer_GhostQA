CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseStepsDetails]
@TestSuiteName		VARCHAR(100),
@TestRunName		VARCHAR(100),
@TestCaseName		VARCHAR(100),
@TimeZone			VARCHAR(100) = 'India Standard Time'
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseStepsDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	20 Dec 2023
MODIFIED BY		:	Mohammad Mobin
MODIFIED DATE	:	26 Dec 2023
PROC EXEC		:
				EXEC stp_GetTestCaseStepsDetails 'Mississippi', 'TestRun-1', 'VerifyOK'
**************************************************************************************/
BEGIN TRY

	SELECT
		*
	INTO #temp
	FROM
		tbl_TestCase t
	WHERE
		[TestSuiteName] = @TestSuiteName
		AND [TestRunName] = @TestRunName
		AND [TestCaseName] = @TestCaseName

	DROP TABLE IF EXISTS #TempResults;
	CREATE TABLE #TempResults (
		[Status] NVARCHAR(50),
		[Timestamp] VARCHAR(100),
		Details NVARCHAR(MAX),
		FailureMessage NVARCHAR(MAX),
		FailureException NVARCHAR(MAX),
		FailureScreenShots NVARCHAR(MAX)
	);

	INSERT INTO #TempResults
	SELECT 
	    JSON_VALUE(value, '$.Status') AS [Status],
	    JSON_VALUE(value, '$.Timestamp') AS [Timestamp],
	    JSON_VALUE(value, '$.Details') AS Details,
	    JSON_VALUE(value, '$.FailureMessage') AS FailureMessage,
	    JSON_VALUE(value, '$.FailureException') AS FailureException,
	    JSON_VALUE(value, '$.FailureScreenShots') AS FailureScreenShots
	FROM 
	    #temp
	CROSS APPLY 
	    OPENJSON(TestCaseSteps);

	UPDATE #TempResults
	SET [Timestamp] = CONVERT(VARCHAR(8), CAST(CAST([Timestamp] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone AS TIME), 108);

	DECLARE @UpdatedJson NVARCHAR(MAX);
	SELECT @UpdatedJson = (
		SELECT
		    [Status],
		    [TimeStamp],
		    Details,
		    FailureMessage,
		    FailureException,
		    FailureScreenShots
		FROM
		    #TempResults
		FOR JSON PATH
	);

	UPDATE #temp
	SET TestCaseSteps = @UpdatedJson

	SELECT [TestCaseStepsJson] = JSON_QUERY((
		SELECT [TestCaseName], [TestCaseSteps],
			CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone), 'dd-MMM-yyyy HH:mm:ss')AS DATE) AS [TestCaseStartDate],
			CONVERT(VARCHAR(8), CAST(MIN((CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone)) AS TIME), 108) AS [TestCaseStartTime],
			CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone), 'dd-MMM-yyyy HH:mm:ss') AS DATE) AS [TestCaseEndDate],
			CONVERT(VARCHAR(8), CAST(MAX((CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET) AT TIME ZONE @TimeZone)) AS TIME), 108) AS [TestCaseEndTime]
		FROM
			#temp t
		GROUP BY
			[TestCaseName], [TestCaseSteps]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))

	DROP TABLE IF EXISTS #temp;
	DROP TABLE IF EXISTS #TempResults;
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH