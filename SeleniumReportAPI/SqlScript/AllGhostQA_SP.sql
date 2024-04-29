CREATE OR ALTER PROCEDURE [dbo].[stp_AddExecuteData]
@TestSuite                VARCHAR(100),
@TestCase	              VARCHAR(100),
@TestCaseDetailsId        INT,
@TestCaseName	          VARCHAR(100),
@Status  			      VARCHAR(10),
@StartDateTime            VARCHAR(50),
@EndDateTime              VARCHAR(50),
@TestStepJson			  NVARCHAR(MAX),
@SuiteDuration			  VARCHAR(10),
@TestDuration			  VARCHAR(10),
@TestScreenShot			  NVARCHAR(MAX),
@TesterName				  VARCHAR(100),
@TestVideoUrl			  NVARCHAR(MAX),
@ContainerLog             VARBINARY(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddExecuteData
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	20th March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	26th March 2024
PROC EXEC		:  EXEC stp_AddExecuteData
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_CypressTestExecution] ([TestSuite], [TestCaseId], [TestCaseDetailsId], [TestCaseName], [Status], [StartDateTime],
		[EndDateTime], [TestStepJson], [SuiteDuration], [TestDuration], [TestScreenShotUrl], [TesterName], [TestVideoUrl]) 
		VALUES (@TestSuite, @TestCase, @TestCaseDetailsId, @TestCaseName, @Status, @StartDateTime, @EndDateTime, @TestStepJson, @SuiteDuration, @TestDuration,
		@TestScreenShot, @TesterName, @TestVideoUrl, @ContainerLog)
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddExecutePerformanceData]
@RootId                   INT,
@Name	                  VARCHAR(100),
@RunId                    VARCHAR(100),
@Status  			      VARCHAR(10) = NULL,
@StartDateTime            VARCHAR(50),
@EndDateTime              VARCHAR(50),
@LoadDataJson			  VARBINARY(MAX) = NULL,
@LocationDataJson		  NVARCHAR(MAX) = NULL,
@TestDataJson			  NVARCHAR(MAX) = NULL,
@PropertyDataJson		  NVARCHAR(MAX) = NULL,
@TesterName				  VARCHAR(100),
@MaxDuration			  INT,
@Scenarios				  VARCHAR(MAX),
@TotalDuration			  INT,
@TotalRampUpSteps		  INT,
@TotalRampUpTime		  INT,
@TotalUser				  INT
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddLocation]
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddPerformance]
@RootId         int,
@TestCaseName	NVARCHAR(MAX),
@FileName       NVARCHAR(MAX),
@FilePath       NVARCHAR(MAX)
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
		INSERT INTO [dbo].[tbl_PerformanceFile] ([RootId], [TestCaseName], [FileName], [FilePath]) 
		VALUES (@RootId, @TestCaseName, @FileName, @FilePath)
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddProjectRootRelation]
@ParentId	        int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddProjectRootRelation 
				
**************************************************************************************/
BEGIN TRY
   IF EXISTS( SELECT 1 FROM tbl_ProjectRootRelation WHERE [ParentId] = @ParentId AND [Name] = @Name)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_ProjectRootRelation] ([ParentId], [Name]) 
		VALUES (@ParentId, @Name)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], '' [message],
					[Data] = JSON_QUERY((
						SELECT Id [id], ParentId [parentId], [Name] [name]
						FROM tbl_ProjectRootRelation where Id = SCOPE_IDENTITY()
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddProperties]
@PerformanceFileId    INT,
@Name	              NVARCHAR(MAX),
@Value	              NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddProperties
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	14th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddProperties 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_PerformanceProperties] ([PerformanceFileId],[Name], [Value]) 
		VALUES (@PerformanceFileId, @Name, @Value)
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
GO
CREATE OR ALTER   PROCEDURE [dbo].[stp_AddRootRelation]
@RootId         int = 0,
@Node		    int,
@Parent	        int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	9th April 2024
PROC EXEC		:  EXEC stp_AddRootRelation 
				
**************************************************************************************/
BEGIN TRY
 IF EXISTS( SELECT 1 FROM [dbo].[tbl_RootRelation] WHERE [Parent] = @Parent AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_RootRelation] ( Node, Parent, Name) 
		VALUES (@Node, @Parent, @Name)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], '' [message],
					[Data] = JSON_QUERY((
						SELECT RootId [id], Parent [parentId], [Name] [name]
						FROM tbl_RootRelation where RootId = SCOPE_IDENTITY()
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddTestCaseDetails]
@TestCaseDetailsId         int = 0,
@RootId		               int,
@StartUrl                  VARCHAR(100),
@TestCaseName              VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestCaseDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddTestCaseDetails 
				
**************************************************************************************/
BEGIN TRY
IF EXISTS( SELECT 1 FROM tbl_TestCaseDetails WHERE [RootId] = @RootId AND [TestCaseName] = @TestCaseName)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Test Case Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_TestCaseDetails] ( RootId, TestCaseName, StartUrl) 
		VALUES (@RootId, @TestCaseName, @StartUrl)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Added Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT TestCaseDetailsId [id], RootId [rootId], [TestCaseName] [testCaseName], [StartUrl] [startUrl]
						FROM tbl_TestCaseDetails where TestCaseDetailsId = SCOPE_IDENTITY()
						FOR JSON PATH
					))
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddTestData]
@PerformanceFileId    INT,
@Name	              NVARCHAR(MAX),
@JsonData	          NVARCHAR(MAX),
@FilePath			  NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestData
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddTestStepsDetails]
@AddStepsJson                 NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestStepsDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddTestStepsDetails 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		DELETE FROM tbl_TestStepsDetails 
		WHERE TestCaseDetailsId = JSON_VALUE(@AddStepsJson, '$.testCaseID')

		INSERT INTO tbl_TestStepsDetails([TestCaseDetailsId], [Action], StepDescription, IsOptional, SelectorType, SelectorValue, SendKeyInput, ScrollPixel, [Url], SelectedUser, [FileName], ElementValue, CssValue, CssProperty, PageTitle, CurrentUrl, ShouldNotEqualValue, ShouldIncludeValue, ShouldEqualValue, ShouldGreaterThanValue, ShouldLessValue, ContainTextValue, HaveAttributeValue, TextValue, Wait)
		SELECT 
			JSON_VALUE(@AddStepsJson, '$.testCaseID'),
			act.[action],
			act.[stepDescription],
			act.[isOptional],
			act.[selectorType],
			act.[selectorValue],
			act.[sendKeyInput],
			act.[scrollPixel],
			act.[url],
			act.[selectedUser],
			act.[fileName],
			act.[elementValue],
			act.[cssValue],
			act.[cssProperty],
			act.[pageTitle],
			act.[currentUrl],
			act.[shouldNotEqualValue],
			act.[shouldIncludeValue],
			act.[shouldEqualValue],
			act.[shouldGreaterThanValue],
			act.[shouldLessValue],
			act.[containTextValue],
			act.[haveAttributeValue],
			act.[textValue],
			act.[wait]
		FROM 
			OPENJSON(@AddStepsJson, '$.actions') 
			WITH (
				[action] NVARCHAR(50) '$.action',
				[stepDescription] NVARCHAR(MAX) '$.stepDescription',
				[isOptional] bit '$.isOptional',
				[selectorType] NVARCHAR(MAX) '$.selectorType',
				[selectorValue] NVARCHAR(MAX) '$.selectorValue',
				[sendKeyInput] NVARCHAR(MAX) '$.sendKeyInput',
				[scrollPixel] NVARCHAR(MAX) '$.scrollPixel',
				[url] NVARCHAR(MAX) '$.url',
				[selectedUser] NVARCHAR(MAX) '$.selectedUser',
				[fileName] NVARCHAR(MAX) '$.fileName',
				[elementValue] NVARCHAR(MAX) '$.elementValue',
				[cssValue] NVARCHAR(MAX) '$.cssValue',
				[cssProperty] NVARCHAR(MAX) '$.cssProperty',
				[pageTitle] NVARCHAR(MAX) '$.pageTitle',
				[currentUrl] NVARCHAR(MAX) '$.currentUrl',
				[shouldNotEqualValue] NVARCHAR(MAX) '$.shouldNotEqualValue',
				[shouldIncludeValue] NVARCHAR(MAX) '$.shouldIncludeValue',
				[shouldEqualValue] NVARCHAR(MAX) '$.shouldEqualValue',
				[shouldGreaterThanValue] NVARCHAR(MAX) '$.shouldGreaterThanValue',
				[shouldLessValue] NVARCHAR(MAX) '$.shouldLessValue',
				[containTextValue] NVARCHAR(MAX) '$.containTextValue',
				[haveAttributeValue] NVARCHAR(MAX) '$.haveAttributeValue',
				[textValue] NVARCHAR(MAX) '$.textValue',
				[wait] NVARCHAR(Max) '$.wait'
			) AS act;
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Added Successfully' [message]
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddUpdateApplication]
@ApplicationId			INT = 0,
@ApplicationName		NVARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateApplication
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	19 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddUpdateApplication 0, 'test app'
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS( SELECT 1 FROM tbl_Applications WHERE [ApplicationName] = @ApplicationName AND [ApplicationId] <> @ApplicationId)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Application Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @ApplicationId = 0
	BEGIN
		INSERT INTO tbl_Applications (ApplicationName) 
		VALUES (@ApplicationName)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Application Saved Successfully' [message]
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
	ELSE
	BEGIN 
		UPDATE tbl_Applications
			SET[ApplicationName]    = @ApplicationName
		WHERE [ApplicationId]		= @ApplicationId

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Applicaiton Updated Successfully' [message]
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddUpdateBrowser]
@BrowserName		VARCHAR(100),
@BrowserId			INT = 0
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateBrowser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddUpdateBrowser 0
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS( SELECT 1 FROM tbl_Browsers WHERE [BrowserName] = @BrowserName AND [BrowserId] <> @BrowserId)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Browser Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @BrowserId = 0
	BEGIN
		INSERT INTO tbl_Browsers (BrowserName) 
		VALUES (@BrowserName)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Browser Saved Successfully' [message]
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
	ELSE
	BEGIN 
		UPDATE tbl_Browsers
			SET[BrowserName]   = @BrowserName
		WHERE [BrowserId]	   = @BrowserId

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Browser Updated Successfully' [message]
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddUpdateEnvironment]
@EnvironmentName		VARCHAR(100),
@EnvironmentId			INT = 0,
@ApplicationId          INT,
@BrowserId              INT,
@Baseurl                VARCHAR(1000),
@BasePath				VARCHAR(1000),
@DriverPath				VARCHAR(1000),
@CreatedBy				VARCHAR(100) = 'Admin',
@ModifiedBy				VARCHAR(100) = 'Admin',
@Description			VARCHAR(500)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateEnvironment
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	19 Jan 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	23 Jan 2024
PROC EXEC		:  EXEC stp_AddUpdateEnvironment 0
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS( SELECT 1 FROM tbl_Environments WHERE [EnvironmentName] = @EnvironmentName AND [EnvironmentId] <> @EnvironmentId)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Environment Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @EnvironmentId = 0
	BEGIN
		INSERT INTO tbl_Environments (EnvironmentName, ApplicationId, DriverPath, BroswerId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, BasePath, Baseurl, Description) 
		VALUES (@EnvironmentName, @ApplicationId, @DriverPath, @BrowserId, @CreatedBy, GETDATE(), @ModifiedBy, GETDATE(), @BasePath, @Baseurl, @Description)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Environment Saved Successfully' [message]
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
	ELSE
	BEGIN 
		UPDATE tbl_Environments
			SET[EnvironmentName]   = @EnvironmentName,
               [ApplicationId]	   = @ApplicationId,
			   [DriverPath]		   = @DriverPath,
               [BroswerId]		   = @BrowserId,
               [ModifiedBy]		   = @ModifiedBy,
			   [ModifiedOn]        = GETDATE(),
               [BasePath]          = @BasePath,
			   [Baseurl]           = @Baseurl,
			   [Description]	   = @Description
		WHERE [EnvironmentId]	   = @EnvironmentId

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Environments Updated Successfully' [message]
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddUpdateLoadData]
@PerformanceFileId		INT,
@TotalUser				INT,
@DurationMin			INT,
@RampupTime				INT,
@Steps					INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddLoad
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddUpdateLoadData 
				
**************************************************************************************/
BEGIN TRY
  IF EXISTS( SELECT 1 FROM tbl_Load WHERE [PerformanceFileId] = @PerformanceFileId)
	BEGIN
		UPDATE tbl_Load
			SET [TotalUsers] = @TotalUser,
				[DurationInMinutes] = @DurationMin,
				[RampUpTimeInSeconds] = @RampupTime,
				[RampUpSteps] = @Steps
			WHERE [PerformanceFileId] = @PerformanceFileId
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_Load] ([PerformanceFileId], [TotalUsers], [DurationInMinutes], [RampUpTimeInSeconds], [RampUpSteps]) 
		SELECT @PerformanceFileId, @TotalUser, @DurationMin, @RampupTime, @Steps
	END
	
	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Data Saved Successfully' [message]
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
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddUpdateTestSuites]
@TestSuiteName			VARCHAR(100),
@TestSuiteType			VARCHAR(100),
@ApplicationId			INT,
@SendEmail				BIT,
@EnvironmentId			INT,
@SelectedTestCases		NVARCHAR(MAX),
@Description			NVARCHAR(MAX) = '',
@TestSuiteId			INT = 0,
@TestUserId				INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateTestSuites
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	15 Jan 2024
MODIFIED BY		:	Mohammad Yaseer
MODIFIED DATE	:	17 Jan 2024
PROC EXEC		:
				EXEC stp_AddUpdateTestSuites 'Mississippi', 0
**************************************************************************************/
BEGIN TRY
	IF EXISTS( SELECT 1 FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName AND [TestSuiteId] <> @TestSuiteId)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Custom Test Suite Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @TestSuiteId = 0
	BEGIN
		IF NOT EXISTS( SELECT 1 FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName AND [TestSuiteId] <> @TestSuiteId)
		BEGIN
			INSERT INTO tbl_TestSuites (TestSuiteName, TestSuiteType, ApplicationId, SendEmail, EnvironmentId, SelectedTestCases, Description) 
			VALUES (@TestSuiteName, @TestSuiteType, @ApplicationId, @SendEmail, @EnvironmentId, @SelectedTestCases, @Description, @TestUserId)
		END
		ELSE
		BEGIN
			SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'In-Built Test Suite already have this Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
		END
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Test Suite Saved Successfully' [message]
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
	ELSE
	BEGIN 
		UPDATE tbl_TestSuites
			SET [TestSuiteName]		= @TestSuiteName,
				[TestSuiteType]		= @TestSuiteType,
				[ApplicationId]		= @ApplicationId,
				[SendEmail]			= @SendEmail,
				[EnvironmentId]		= @EnvironmentId,
				[SelectedTestCases] = @SelectedTestCases,
				[Description]		= @Description,
				[TestUserId]        = @TestUserId
		WHERE [TestSuiteId] = @TestSuiteId

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Test Suite Updated Successfully' [message]
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddUser]
@Id         uniqueidentifier,
@Email		VARCHAR(100),
@Password	VARCHAR(100),
@normalizeEmail VARCHAR(100),
@securityStamp     uniqueidentifier
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	23 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddUser test@yopmail.com Test@123
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[AspNetUsers] (Id, UserName, Email, EmailConfirmed, PasswordHash, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnabled, 
		AccessFailedCount, NormalizedEmail,NormalizedUserName,SecurityStamp) 
		VALUES (@Id, @Email, @Email, 1, @Password, 0, 0, 0 ,0,@normalizeEmail, @normalizeEmail,@securityStamp)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Created User Successfully' [message]
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteApplication]
@ApplicationId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteApplication
CREATED BY		:	Mohammad Yaseer
CREATED DATE	:	05 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteApplication 1000
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Applications WHERE [ApplicationId] = @ApplicationId)
	BEGIN
		DECLARE @TestSuiteName VARCHAR(1000)= ''
		SET @TestSuiteName = (SELECT
								STUFF((
									SELECT ', ' + TestSuiteName
									FROM tbl_TestSuites
									WHERE ApplicationId = @ApplicationId
									FOR XML PATH('')
								), 1, 2, '') AS ConcatenatedTestSuiteNames)

		IF NOT EXISTS(SELECT 1 FROM tbl_TestSuites WHERE ApplicationId = @ApplicationId)
		BEGIN
			DELETE FROM tbl_Applications WHERE [ApplicationId] = @ApplicationId
		END
		ELSE
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'fail' [status], @TestSuiteName [message]
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
			))
		END
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'This is not a Valid ApplicationId' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Application Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [ApplicationListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteBrowser]
@BrowserId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteBrowser
CREATED BY		:	Mohammad Yaseer
CREATED DATE	:	05 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteBrowser 1000
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Browsers WHERE [BrowserId] = @BrowserId)
	BEGIN
		DECLARE @TestSuiteName VARCHAR(1000)= ''
		SET @TestSuiteName = (SELECT
								STUFF((
									SELECT ', ' + TestSuiteName
									FROM tbl_TestSuites
									WHERE EnvironmentId IN (SELECT EnvironmentId FROM tbl_Environments WHERE BroswerId = @BrowserId)
									FOR XML PATH('')
								), 1, 2, '') AS ConcatenatedTestSuiteNames)

		IF NOT EXISTS(SELECT 1 FROM tbl_TestSuites WHERE EnvironmentId IN (SELECT EnvironmentId FROM tbl_Environments WHERE BroswerId = @BrowserId))
		BEGIN
			DELETE FROM tbl_Browsers WHERE [BrowserId] = @BrowserId
		END
		ELSE
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'fail' [status], @TestSuiteName [message]
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
			))
		END
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'This is not a Valid BrowserId' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Browser Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [BrowserListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteEnvironment]
@EnvironmentId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteEnvironment
CREATED BY		:	Mohammad Yaseer
CREATED DATE	:	05 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteEnvironment 1000
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Environments WHERE [EnvironmentId] = @EnvironmentId)
	BEGIN
		DECLARE @TestSuiteName VARCHAR(1000)= ''
		SET @TestSuiteName = (SELECT
								STUFF((
									SELECT ', ' + TestSuiteName
									FROM tbl_TestSuites
									WHERE EnvironmentId = @EnvironmentId
									FOR XML PATH('')
								), 1, 2, '') AS ConcatenatedTestSuiteNames)

		IF NOT EXISTS(SELECT 1 FROM tbl_TestSuites WHERE EnvironmentId = @EnvironmentId)
		BEGIN
			DELETE FROM tbl_Environments WHERE [EnvironmentId] = @EnvironmentId
		END
		ELSE
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'fail' [status], @TestSuiteName [message]
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
			))
		END
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'This is not a Valid EnvironmentId' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Environment Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [EnvironmentListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteLoad]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteLoad
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteLoad 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_Load WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_Load WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Location not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Location Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [LoadListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteLocation]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteLocation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	14th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteLocation 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_PerformanceLocation WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_PerformanceLocation WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Location not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Location Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [LocationListJson]
END CATCH
GO
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
	IF EXISTS(SELECT 1 FROM tbl_PerformanceFile WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_PerformanceFile WHERE [Id] = @Id
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteProjectRootRelation]
@Id			    Int,
@ParentId		Int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th Mar 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteProjectRootRelation 1
**************************************************************************************/
BEGIN TRY
    -- Common Table Expression to select all nodes and child nodes
    ;WITH ALL_NODE_CHILDNODES AS (
        SELECT [Id], [ParentId], [Name]
        FROM tbl_ProjectRootRelation
        WHERE [Id] = @Id

        UNION ALL

        SELECT trr.[Id], trr.[ParentId], trr.[Name]
        FROM tbl_ProjectRootRelation trr
        INNER JOIN ALL_NODE_CHILDNODES CN ON trr.[ParentId] = CN.[Id]
    )
    -- Deleting all related nodes
    DELETE FROM tbl_ProjectRootRelation
    WHERE [Id] IN (SELECT [Id] FROM ALL_NODE_CHILDNODES);

    -- Deleting the root node
    DELETE FROM tbl_ProjectRootRelation WHERE [Id] = @Id;

    IF @@ERROR = 0
    BEGIN
        -- Return success message if deletion is successful
        SELECT [result] = JSON_QUERY((
            SELECT 'success' [status], 'Deleted Successfully' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
    ELSE
    BEGIN
        -- Return error message if deletion fails
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' [status], 'Deletion failed' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    -- Return error message if an exception is caught
    SELECT [result] = JSON_QUERY((
        SELECT 'error' [status], ERROR_MESSAGE() [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteProperties]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteProperties
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	14th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteProperties 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_PerformanceProperties WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_PerformanceProperties WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Property not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Property Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [PropertyListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteRootRelation]
    @RootId     INT,
    @ParentId   INT
AS
/**************************************************************************************
PROCEDURE NAME   : stp_DeleteRootRelation
CREATED BY       : Mohammed Yaseer
CREATED DATE     : 5th Mar 2024
MODIFIED BY      : 
MODIFIED DATE    : 
PROC EXEC        :
                  EXEC stp_DeleteRootRelation 1
**************************************************************************************/
BEGIN TRY
    -- Common Table Expression to select all nodes and child nodes
    ;WITH ALL_NODE_CHILDNODES AS (
        SELECT [RootId], [Parent], [Name]
        FROM tbl_RootRelation
        WHERE [RootId] = @RootId

        UNION ALL

        SELECT trr.[RootId], trr.[Parent], trr.[Name]
        FROM tbl_RootRelation trr
        INNER JOIN ALL_NODE_CHILDNODES CN ON trr.[Parent] = CN.[RootId]
    )
    -- Deleting all related nodes
    DELETE FROM tbl_RootRelation
    WHERE [RootId] IN (SELECT [RootId] FROM ALL_NODE_CHILDNODES);

    -- Deleting the root node
    DELETE FROM tbl_RootRelation WHERE [RootId] = @RootId;

    IF @@ERROR = 0
    BEGIN
        -- Return success message if deletion is successful
        SELECT [result] = JSON_QUERY((
            SELECT 'success' [status], 'Deleted Successfully' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
    ELSE
    BEGIN
        -- Return error message if deletion fails
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' [status], 'Deletion failed' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    -- Return error message if an exception is caught
    SELECT [result] = JSON_QUERY((
        SELECT 'error' [status], ERROR_MESSAGE() [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteTestCaseDetailsByTestCaseDetailsId]
@TestCaseDetailsId			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteTestCaseDetailsByTestCaseDetailsId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	26th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteTestCaseDetailsByTestCaseDetailsId 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_TestCaseDetails WHERE [TestCaseDetailsId] = @TestCaseDetailsId)
	BEGIN
		DELETE FROM tbl_TestCaseDetails WHERE [TestCaseDetailsId] = @TestCaseDetailsId
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'TestCaseDetail not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'TestCaseDetail Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [TestDataJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteTestData]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteTestData
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteTestData 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_TestData WHERE [Id] = @Id)
	BEGIN
		DELETE FROM tbl_TestData WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Location not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Location Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [TestDataJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteTestSuites]
@TestSuiteName			VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteTestSuites
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	15 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteTestSuites 1001
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName)
	BEGIN
		IF EXISTS(SELECT 1 FROM tbl_TestCase WHERE [TestSuiteName] = @TestSuiteName)
		BEGIN
			DELETE FROM tbl_TestCase WHERE [TestSuiteName] = @TestSuiteName
		END
		DELETE FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'This is not a Custom Test Suite' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Test Suite Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [testSuiteListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DisableEnableUser]
@IsDisabled		        VARCHAR(100),
@UserId			        NVARCHAR(450)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DisableEnableUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	29 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_DisableEnableUser 
				
**************************************************************************************/
BEGIN TRY
		IF (SELECT COUNT(1) FROM [AspNetUsers] WHERE [Id]  = @UserId AND [UserName] = 'admin@gmail.com') > 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Oops! It seems you are trying to disable the product admin, but you can not do that! 🙅‍♂️ Please contact the system administrator for further assistance. Thank you!' [message]
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
			))
		END
		ELSE
		BEGIN
			UPDATE [dbo].[AspNetUsers]
				SET  IsDisabled = @IsDisabled
			WHERE [Id] = @UserId
		END

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
END TRY
BEGIN CATCH
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetApplications]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetApplications
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	16 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetApplications
**************************************************************************************/
BEGIN TRY
	SELECT [ApplicationListJson] = JSON_QUERY((
		SELECT [ApplicationId], [ApplicationName]
		FROM tbl_Applications
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [ApplicationListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetBrowsers]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetBrowsers
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	22 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetBrowsers
**************************************************************************************/
BEGIN TRY
	SELECT [Browsers] = JSON_QUERY((
		SELECT [BrowserName], 
		       [BrowserId]
		FROM tbl_Browsers
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [Browsers]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetCustomTestSuites]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetCustomTestSuites
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	15 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetCustomTestSuites
**************************************************************************************/
BEGIN TRY
	SELECT [testSuiteListJson] = JSON_QUERY((
		SELECT [TestSuiteId], [TestSuiteName]
		FROM tbl_TestSuites
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [testSuiteListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetDashBoardChartDetails]
@TestSuitName			VARCHAR(100),
@FilterType				VARCHAR(100),
@FilterValue			INT = 7
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetDashBoardChartDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC [stp_GetDashBoardChartDetails] 'Mississippi', 'days' , 18
**************************************************************************************/
BEGIN TRY
    DECLARE @SQLQuery NVARCHAR(MAX)

    SET @SQLQuery = '
        (SELECT [DashBoardDetailsJson] = JSON_QUERY((
            SELECT DISTINCT TOP ' + CAST(@FilterValue AS NVARCHAR(10)) + ' 
				t.[TestSuitename],
				t.[TestRunName],
				CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) AS [TestRunStartDate],
				ISNULL((SELECT COUNT(1)
					FROM tbl_TestCase t1
					WHERE t1.[TestSuiteName] = t.[TestSuiteName]
							AND t1.[TestRunName] = t.[TestRunName]
							AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
					GROUP BY t1.[TestRunName]
				),0) AS [TotalTestCase],
				ISNULL((SELECT COUNT(1)
					FROM tbl_TestCase t1
					WHERE t1.[TestSuiteName] = t.[TestSuiteName]
							AND t1.[TestRunName] = t.[TestRunName]
							AND t1.[TestCaseStatus] LIKE ''%Passed%''
							AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
					GROUP BY t1.[TestRunName]
				),0) AS [TotalPassedTestCase],
				ISNULL((SELECT COUNT(1)
					FROM tbl_TestCase t1
					WHERE t1.[TestSuiteName] = t.[TestSuiteName]
							AND t1.[TestRunName] = t.[TestRunName]
							AND t1.[TestCaseStatus] LIKE ''%Failed%''
							AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
					GROUP BY t1.[TestRunName]
				),0) AS [TotalFailedTestCase]
				FROM 
					tbl_TestCase t
				WHERE 
					t.[TestSuiteName] = '''+ @TestSuitName +'''
				GROUP BY
					t.[TestSuitename],
					t.[TestRunName],
					CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
				ORDER BY 
					CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) DESC,
					t.[TestRunName] DESC
        FOR JSON PATH)))'
	PRINT @SQLQuery

    IF @FilterType = 'runs'
        EXEC sp_executesql @SQLQuery
    ELSE
        SELECT
            [DashBoardDetailsJson] = JSON_QUERY((
                SELECT DISTINCT CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) AS [TestRunStartDate],
                       t.[TestSuitename],
                    (
                        SELECT COUNT(t1.[TestRunName])
                        FROM tbl_TestCase t1
                        WHERE t1.[TestSuiteName] = t.[TestSuiteName]
                                AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
                    ) AS [TotalTestCase],
                    (
                        SELECT COUNT(t1.[TestRunName])
                        FROM tbl_TestCase t1
                        WHERE t1.[TestSuiteName] = t.[TestSuiteName]
                                AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
                                AND t1.[TestCaseStatus] LIKE '%Passed%'
                    ) AS [TotalPassedTestCase],
                    (
                        SELECT COUNT(t1.[TestRunName])
                        FROM tbl_TestCase t1
                        WHERE t1.[TestSuiteName] = t.[TestSuiteName]
                                AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
                                AND t1.[TestCaseStatus] LIKE '%Failed%'
                    ) AS [TotalFailedTestCase]
                FROM tbl_TestCase t
                WHERE t.[TestSuiteName] = @TestSuitName
                      AND CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) >= CAST(DATEADD(DAY,-@FilterValue,GETDATE()) AS DATE)
                GROUP BY t.[TestSuitename], [TestRunStartDateTime]
                ORDER BY CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) DESC
            FOR JSON PATH))
END TRY
BEGIN CATCH
    -- Add error handling logic here
END CATCH

GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetDashBoardDetails]
@TestSuitName			VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetDashBoardDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetDashBoardDetails 'Mississippi'
**************************************************************************************/
BEGIN TRY
	SELECT [DashBoardDetailsJson] = JSON_QUERY((
		SELECT DISTINCT CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) AS [TestRunStartDate],
			   t.[TestSuitename],
			(
				SELECT COUNT(t1.[TestRunName])
				FROM tbl_TestCase t1
				WHERE t1.[TestSuiteName] = t.[TestSuiteName]
						AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
			) AS [TotalTestCase],
			(
				SELECT COUNT(t1.[TestRunName])
				FROM tbl_TestCase t1
				WHERE t1.[TestSuiteName] = t.[TestSuiteName]
						AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
						AND t1.[TestCaseStatus] LIKE '%Passed%'
			) AS [TotalPassedTestCase],
			(
				SELECT COUNT(t1.[TestRunName])
				FROM tbl_TestCase t1
				WHERE t1.[TestSuiteName] = t.[TestSuiteName]
						AND CAST(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) = CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE)
						AND t1.[TestCaseStatus] LIKE '%Failed%'
			) AS [TotalFailedTestCase]
		FROM tbl_TestCase t
		WHERE t.[TestSuiteName] = @TestSuitName
		GROUP BY t.[TestSuitename], [TestRunStartDateTime]
		ORDER BY CAST(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET) AS DATE) DESC
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetEnvironment]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetEnvironment
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	16 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetEnvironment
**************************************************************************************/
BEGIN TRY
	SELECT [EnvironmentListJson] = JSON_QUERY((
		SELECT env.[EnvironmentId],
		       [EnvironmentName],
			   env.[ApplicationId],
			   app.[ApplicationName],
			   [DriverPath],
			   env.BroswerId,
			   bro.[BrowserName],
               [CreatedBy],
			   [CreatedOn],
			   [ModifiedBy],
			   [ModifiedOn],
			   [BasePath],
			   [Baseurl],
			   [Description]
		FROM tbl_Environments as env
	   LEFT JOIN tbl_Applications as app
		ON env.ApplicationId = app.ApplicationId
	   LEFT	JOIN tbl_Browsers as bro
		ON env.BroswerId = bro.BrowserId
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [EnvironmentListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetEnvironmentById]
@EnvironmentId int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetEnvironmentById
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetEnvironmentById
**************************************************************************************/
BEGIN TRY
		SELECT
		        E.[EnvironmentId],
				E.[EnvironmentName],
				E.[ApplicationId],
				(SELECT TOP 1 [ApplicationName] FROM tbl_Applications A WHERE A.[ApplicationId] = E.[ApplicationId]) [ApplicationName],
				E.[DriverPath],
		        E.[BroswerId],
				(SELECT TOP 1 [BrowserName] FROM tbl_Browsers B WHERE B.[BrowserId] = E.[BroswerId]) [BrowserName],
				E.[CreatedBy],
				E.[CreatedOn],
				E.[ModifiedBy],
				E.[ModifiedOn],
				E.[BasePath],
				E.[Baseurl],
				E.[Description]
		FROM tbl_Environments E
		WHERE EnvironmentId = @EnvironmentId
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [GetEnvironment]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetExcutedByRootId]
@RootId           Int,
@TestName         VARCHAR(50)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetExcutedByRootId
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	5th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetExcutedByRootId
**************************************************************************************/
BEGIN TRY
	SELECT [testsuite] = JSON_QUERY((
		SELECT trr.[name],
		[beforeEach] = JSON_QUERY((
				SELECT  'visit' [type], tccd.[StartUrl] [selector]
				FROM tbl_TestCaseDetails tccd
				WHERE tccd.[RootId] = trr.[RootId] AND tccd.[TestCaseName] = @TestName
				FOR JSON PATH)),
			[testCases] = JSON_QUERY((
				SELECT tcd.[TestCaseName] [name], 
				[actions] = JSON_QUERY((
					SELECT tsd.[Action] [type], (
													(CASE
														WHEN tsd.[SelectorType] = 'ID' THEN CONCAT('#',tsd.[SelectorValue])
														WHEN tsd.[SelectorType] = 'CLASS' THEN CONCAT('.',tsd.[SelectorValue])
														WHEN tsd.[SelectorType] = 'NAME' THEN CONCAT('[name=',tsd.[SelectorValue],']')
													ELSE tsd.[SelectorValue]
													END)
												) [selector],
												(
													(CASE
														WHEN tsd.[Action] = 'type' OR tsd.[Action] = 'element_text_contains' THEN tsd.[SendKeyInput]
														ELSE tsd.[StepDescription]
														END
													)
												) [text],
										tsd.[StepDescription] [name],
										tsd.[IsOptional]
					FROM tbl_TestStepsDetails tsd
					WHERE tsd.[TestCaseDetailsId] = tcd.[TestCaseDetailsId]
				FOR JSON PATH))
			FROM tbl_TestCaseDetails tcd
			WHERE tcd.[RootId] = trr.[RootId] AND tcd.[TestCaseName] = @TestName
		FOR JSON PATH))
	FROM tbl_RootRelation trr
	WHERE trr.RootId = @RootId 
FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [Excute]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetExecutedPerformanceByClientId]
@ClientId          VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetExecutedPerformanceByClientId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	2nd March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetExecutedPerformanceByClientId '81c103a0-31dd-4098-a52d-ac9d0c64a7e3'
**************************************************************************************/
BEGIN TRY
    IF EXISTS(SELECT 1 FROM tbl_CypressPerfomanceDetaills WHERE RunId = @ClientId)
    BEGIN
        SELECT [result] = JSON_QUERY((
		SELECT RunId AS client_Id,
			   StartDateTime AS startDate,
			   EndDateTime  AS  endDate,
			   RootId AS rootId,
			   TesterName AS testerName,
			   ISNULL([Name], '') AS [name],
			    [LoadDataJson] AS responseData,
			   ISNULL(TotalUser, '') AS totalUser,
			   ISNULL(Scenarios, '') AS scenarios,
			   ISNULL(TotalDuration, '') AS totalDuration,
			   ISNULL(TotalRampUpSteps, '') AS totalRampUpSteps,
			   ISNULL(TotalRampUpTime, '') AS totalRampUpTime,
			   ISNULL(MaxDuration, '') AS maxDuration
		FROM tbl_CypressPerfomanceDetaills
		WHERE RunId = @ClientId 
	FOR JSON PATH))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY('[]')
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status],
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetExecutedPerformanceByRootId]
@RootId          INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetExecutedPerformanceByRootId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	29th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetExecutedPerformanceByRootId 1
**************************************************************************************/
BEGIN TRY
    IF EXISTS(SELECT 1 FROM tbl_CypressPerfomanceDetaills WHERE RootId = @RootId)
    BEGIN
        SELECT [RunDetailsJson] = JSON_QUERY ((
            SELECT DISTINCT FORMAT(CAST(t.[StartDateTime] AS DATETIMEOFFSET), 'MMMM dd') AS [TestRunDate],
                   [RunDetails] = JSON_QUERY ((
                        SELECT
                               t1.[RootId],
                               t1.[Name],
                               t1.[RunId],
                               t1.[StartDateTime],
                               t1.[EndDateTime],
                               t1.[TesterName],
                               t1.[Status]
                        FROM tbl_CypressPerfomanceDetaills t1
                        WHERE RootId = @RootId
                            AND FORMAT(CAST(t1.[StartDateTime] AS DATETIMEOFFSET), 'MMMM dd') = FORMAT(CAST(t.[StartDateTime] AS DATETIMEOFFSET), 'MMMM dd')
                        GROUP BY t1.[RunId], t1.[Name], t1.RootId, t1.StartDateTime, t1.EndDateTime, t1.TesterName, t1.Status
                        ORDER BY MIN(CAST(t1.[StartDateTime] AS DATETIMEOFFSET)) DESC
                        FOR JSON PATH
                    ))
            FROM tbl_CypressPerfomanceDetaills t
            WHERE RootId = @RootId
            ORDER BY [TestRunDate] DESC
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [RunDetailsJson] = JSON_QUERY('[]')
    END
END TRY
BEGIN CATCH
    SELECT [RunDetailsJson] = JSON_QUERY((
        SELECT 'fail' AS [status],
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetExecutePerformanceData]
@RootId             INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetExecutePerformanceData
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	27th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetExecutePerformanceData 1064
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_PerformanceFile WHERE [RootId] = @RootId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT pf.[Id],
				   pf.[TestCaseName],
				   pf.[FilePath],
				   pf.[FileName],
				   ISNULL(l.PerformanceFileId, 0) AS PerformanceFileId,
				   ISNULL(l.TotalUsers, 0) AS TotalUsers,
				   ISNULL(l.DurationInMinutes, 0) AS DurationInMinutes,
				   ISNULL(l.RampUpSteps, 0) AS RampUpSteps,
				   ISNULL(l.RampUpTimeInSeconds, 0) AS RampUpTimeInSeconds
            FROM tbl_PerformanceFile pf
			LEFT JOIN tbl_Load l ON pf.Id = l.PerformanceFileId
            WHERE [RootId] = @RootId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'Test Case Name not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetLoadByPerformanceFileId]
@PerformanceFileId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetLoadByPerformanceFileId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetLoadByPerformanceFileId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_Load WHERE PerformanceFileId = @PerformanceFileId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [Id], 
                   ISNULL([PerformanceFileId], '') AS [PerformanceFileId],
                   ISNULL([TotalUsers], '') AS [TotalUsers],
				   ISNULL([DurationInMinutes], '') AS [DurationInMinutes],
				   ISNULL([RampUpTimeInSeconds], '') AS [RampUpTimeInSeconds],
				   ISNULL([RampUpSteps], '') AS [RampUpSteps]
            FROM tbl_Load
            WHERE PerformanceFileId = @PerformanceFileId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'PerformanceFileId not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetLocationByPerformanceFileId]
@PerformanceFileId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetLocationByPerformanceFileId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	14th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetLocationByPerformanceFileId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_PerformanceLocation WHERE PerformanceFileId = @PerformanceFileId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [Id], 
                   ISNULL([PerformanceFileId], '') AS [PerformanceFileId],
                   ISNULL([Name], '') AS [Name],
				   ISNULL([NumberUser], '') AS [NumberUser],
				   ISNULL([PercentageTraffic], '') AS [PercentageTraffic]
            FROM tbl_PerformanceLocation
            WHERE PerformanceFileId = @PerformanceFileId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'PerformanceFileId not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetPerformaceFile]
@RootId      INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetPerformaceFile
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	12th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetPerformaceFile
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id] AS [id],
               ISNULL([RootId], '') AS [rootId],
               ISNULL([TestCaseName], '') AS [testCaseName],
			   ISNULL([FileName], '') AS [fileName],
			   ISNULL( [FilePath], '') AS [FilePath]
		FROM tbl_PerformanceFile
		WHERE [RootId] = @RootId
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [PerformanceFile]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetProfileByEmail]
@Email		        VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetProfileByEmail
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	29 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_GetProfileByEmail 
				
**************************************************************************************/
BEGIN TRY
		SELECT [UserProfile] = JSON_QUERY((
		SELECT [Id], 
			   [UserName],
               [Email],
               ISNULL([FullName], '') [FullName],
			   ISNULL([OrganizationName],'') [OrganizationName],
			   ISNULL([IsDisabled], 'false') [IsDisabled]
		FROM dbo.AspNetUsers
		WHERE [Email] = @Email
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [GetUserProfile]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetProjectRootRelation]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetProjectRootRelation
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id] AS [id],
               ISNULL([ParentId], '') AS [parentId],
               ISNULL([Name], '') AS [name]
		FROM tbl_ProjectRootRelation
		ORDER BY Id DESC
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [ProjectRootRelation]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetPropertyByPerformanceFileId]
@PerformanceFileId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetPropertyByPerformanceFileId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	14th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetPropertyByPerformanceFileId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_PerformanceProperties WHERE PerformanceFileId = @PerformanceFileId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [Id], 
                   ISNULL([PerformanceFileId], '') AS [PerformanceFileId],
                   ISNULL([Name], '') AS [Name],
				   ISNULL([Value], '') AS [Value]
            FROM tbl_PerformanceProperties
            WHERE PerformanceFileId = @PerformanceFileId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'PerformanceFileId not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetRootRelation]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetRootRelation
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [RootId] AS [id], 
		       ISNULL([Node], '') AS [node],
               ISNULL([Parent], '') AS [parentId],
               ISNULL([Name], '') AS [name]
		FROM tbl_RootRelation
		ORDER BY RootId DESC
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [RootRelation]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetRunDetails]
@TestSuitName VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetRunDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	20 Dec 2023
MODIFIED BY		:	Mohammad Mobin
MODIFIED DATE	:	26 Dec 2023
PROC EXEC		:
				EXEC stp_GetRunDetails 'Mississippi'
**************************************************************************************/
BEGIN TRY
	SELECT [RunDetailsJson] = JSON_QUERY ((
		SELECT DISTINCT CAST(FORMAT(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET), 'MMMM dd, yyyy') AS DATE) [TestRunDateYear]
			   , [RunDetails] = JSON_QUERY ((
											SELECT
												t1.[TestSuiteName],
												t1.[TestRunName],
												MIN(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET)) AS [TestRunStartDateTime],
												MAX(CAST(t1.[TestRunEndDateTime] AS DATETIMEOFFSET)) AS [TestRunEndDateTime],
												COUNT(t1.[TestCaseName]) AS [TotalTestCases],
												(SELECT COUNT([TestCaseStatus]) FROM tbl_TestCase WHERE [TestCaseStatus] LIKE '%Passed%' AND [TestSuiteName] = t1.[TestSuiteName] AND [TestRunName] = t1.[TestRunName]) AS [PassedTestCases],
												(SELECT COUNT([TestCaseStatus]) FROM tbl_TestCase WHERE [TestCaseStatus] LIKE '%Failed%' AND [TestSuiteName] = t1.[TestSuiteName] AND [TestRunName] = t1.[TestRunName]) AS [FailedTestCases],
												CASE
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) = 0 THEN 'Failed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) = 0 THEN 'Passed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) >
														 SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) THEN 'Partially Passed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) <
														 SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) THEN 'Partially Failed'
													ELSE 'Partially Passed'
												END AS [TestRunStatus]
											FROM
												tbl_TestCase t1
											WHERE
												t1.[TestSuiteName] = t.[TestSuiteName]
												AND FORMAT(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET), 'MMMM dd yyyy') = FORMAT(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET), 'MMMM dd yyyy')
											GROUP BY t1.[TestSuiteName], t1.[TestRunName]
											ORDER BY MIN(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET)) DESC
											FOR JSON PATH
											))
		FROM tbl_TestCase t
		WHERE t.[TestSuiteName] = @TestSuitName
		ORDER BY [TestRunDateYear] DESC
		FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetRunId]
@TestSuite		VARCHAR(1000)
AS
BEGIN TRY
	DECLARE @Count INT = 0
	IF OBJECT_ID('tbl_TestCase', 'U') IS NOT NULL
	BEGIN
		IF EXISTS(SELECT 1 FROM tbl_TestCase)
		BEGIN
			SELECT @Count = ISNULL((MAX(CAST(REPLACE([TestRunName],'TestRun-','') AS INT))),0) FROM tbl_TestCase WHERE [TestSuiteName] = @TestSuite
		END
	END
	SELECT CONCAT('TestRun-',CAST((@Count + 1) AS VARCHAR(20))) [TestRunName]
END TRY
BEGIN CATCH
	SELECT CONCAT('TestRun-',CAST(ERROR_MESSAGE() AS VARCHAR(20))) [TestRunName] 
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetails]
@TestSuiteName			VARCHAR(100),
@TestRunId				VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	20 Dec 2023
MODIFIED BY		:	Mohammad Mobin
MODIFIED DATE	:	26 Dec 2023
PROC EXEC		:
				EXEC stp_GetTestCaseDetails 'Mississippi', 'TestRun-1'
**************************************************************************************/
BEGIN TRY
    SELECT [TestCaseDetailsJson] = JSON_QUERY((
            SELECT t.[TestSuiteName], t.[TestRunName], t.[TestEnvironment], t.[TesterName]
				, COUNT(t.TestCaseName) [TotalTestCases],
                SUM(CASE WHEN t.[TestCaseStatus] LIKE '%Pass%' THEN 1 ELSE 0 END) [PassedTestCases],
                SUM(CASE WHEN t.[TestCaseStatus] LIKE '%Fail%' THEN 1 ELSE 0 END) [FailedTestCases],
				CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss')AS DATE) AS [TestRunStartDate],
				CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss')AS TIME) AS [TestRunStartTime],
				CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS DATE) AS [TestRunEndDate],
				CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS TIME) AS [TestRunEndTime],
                JSON_QUERY((
                        SELECT t1.[TestSuiteName], t1.[TestRunName], t1.[TestCaseName], t1.[TestCaseStatus]
                            , t1.[TestCaseVideoURL]
                            , CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET) [TestRunStartDateTime]
                            , CAST(t1.[TestRunEndDateTime] AS DATETIMEOFFSET) [TestRunEndDateTime]
                        FROM tbl_TestCase t1
                        WHERE t1.[TestSuiteName] = t.[TestSuiteName]
                              AND t1.[TestRunName] = t.[TestRunName]
                        FOR JSON PATH
                    )) [TestCaseDetailsList]
            FROM tbl_TestCase t
            WHERE [TestSuiteName] = @TestSuiteName 
                  AND [TestRunName] = @TestRunId
            GROUP BY t.[TestSuiteName], t.[TestRunName], t.[TestEnvironment], t.[TesterName]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
END TRY
BEGIN CATCH
    SELECT ERROR_MESSAGE() [ERROR_MESSAGE]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetailsByRootId]
@RootId int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseDetailsByRootId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	4th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestCaseDetailsByRootId 1142
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_TestCaseDetails WHERE RootId = @RootId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [TestCaseDetailsId], 
                   ISNULL([RootId], '') AS [RootId],
				   ISNULL([StartUrl], '') AS [StartUrl],
                   [TestCaseName],
				   (SELECT StartDateTime FROM tbl_CypressTestExecution tcte WHERE  TestCaseDetailsId = tcd.TestCaseDetailsId AND Id = (SELECT MAX(Id) from tbl_CypressTestExecution WHERE  TestCaseDetailsId = tcd.TestCaseDetailsId)) StartDateTime,
				   (SELECT [Status] FROM tbl_CypressTestExecution tcte WHERE  TestCaseDetailsId = tcd.TestCaseDetailsId AND Id = (SELECT MAX(Id) from tbl_CypressTestExecution WHERE  TestCaseDetailsId = tcd.TestCaseDetailsId)) [Status]
            FROM tbl_TestCaseDetails tcd
            WHERE RootId = @RootId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'RootId not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetailsByTestDetailId]
@TestDetailId              INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseDetailsByTestDetailId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22nd March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestCaseDetailsByTestDetailId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_TestCaseDetails WHERE [TestCaseDetailsId] = @TestDetailId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [TestCaseDetailsId], 
                   ISNULL([RootId], '') AS [RootId],
				   ISNULL([StartUrl], '') AS [StartUrl],
                   [TestCaseName]
            FROM tbl_TestCaseDetails
            WHERE [TestCaseDetailsId] = @TestDetailId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'TestCaseDetailsId not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseDetailsLab]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseDetailsLab
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestCaseDetailsLab
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [TestCaseDetailsId], 
		       ISNULL([RootId], '') AS [RootId],
			   ISNULL([StartUrl], '') AS [StartUrl],
               [TestCaseName]
		FROM tbl_TestCaseDetails
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestCaseDetails]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCases]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCases
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestCases
**************************************************************************************/
BEGIN TRY
	SELECT [TestCasesListJson] = JSON_QUERY((
		SELECT DISTINCT [TestCaseName], 0 [IsSelected]
		FROM tbl_TestCase
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestCasesListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestCaseStepsDetails]
@TestSuiteName		VARCHAR(100),
@TestRunName		VARCHAR(100),
@TestCaseName		VARCHAR(100)
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
	SELECT [TestCaseStepsJson] = JSON_QUERY((
		SELECT [TestCaseName], [TestCaseSteps],
			CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss')AS DATE) AS [TestCaseStartDate],
			CAST(FORMAT(MIN(CAST(t.[TestRunStartDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss')AS TIME) AS [TestCaseStartTime],
			CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS DATE) AS [TestCaseEndDate],
			CAST(FORMAT(MAX(CAST(t.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS TIME) AS [TestCaseEndTime]
		FROM
			tbl_TestCase t
		WHERE
			[TestSuiteName] = @TestSuiteName
			AND [TestRunName] = @TestRunName
			AND [TestCaseName] = @TestCaseName
		GROUP BY
			[TestCaseName], [TestCaseSteps]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestDataByPerformanceFileId]
@PerformanceFileId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestDataByPerformanceFileId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	14th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestDataByPerformanceFileId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_TestData WHERE PerformanceFileId = @PerformanceFileId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [Id], 
                   ISNULL([PerformanceFileId], '') AS [PerformanceFileId],
                   ISNULL([Name], '') AS [Name],
				   ISNULL([JsonData], '') AS [JsonData],
				   ISNULL([FilePath], '') AS [FilePath]
            FROM tbl_TestData
            WHERE PerformanceFileId = @PerformanceFileId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'PerformanceFileId not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestDetailByTestCaseName]
@TestId           INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestDetailByTestCaseName
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	21st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestDetailByTestCaseName "1025"
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_CypressTestExecution WHERE [TestCaseDetailsId] = @TestId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT [TestSuite], 
                   ISNULL([TestCaseId], '') AS [TestCase],
                   ISNULL([Status], '') AS [Status],
				   ISNULL([StartDateTime], '') AS [StartDateTime],
				   ISNULL([EndDateTime], '') AS [EndDateTime],
				   ISNULL([TestDuration], '') AS [TestDuration],
				   ISNULL([TestVideoUrl], '') AS [TestVideoUrl]
            FROM tbl_CypressTestExecution
            WHERE [TestCaseDetailsId] = @TestId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'Test Case Name not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestStepsDetailByTestCaseId]
@TestCaseId           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestStepsDetailByTestCaseId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	21st March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	20th April 2024
PROC EXEC		:
				EXEC stp_GetTestStepsDetailByTestCaseId
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_CypressTestExecution WHERE [TestCaseId] = @TestCaseId)
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT ISNULL([TestScreenShotUrl], '') AS [TestScreenShotUrl],
			       [ContainerLog]
            FROM tbl_CypressTestExecution
            WHERE [TestCaseId] = @TestCaseId
            FOR JSON PATH, INCLUDE_NULL_VALUES
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'Test Case Id not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestStepsDetailsByTestStepsId]
@TestStepsId int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestStepsDetailsByTestStepsId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	4th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestStepsDetailsByTestStepsId 1033
**************************************************************************************/
BEGIN TRY
    IF EXISTS (SELECT 1 FROM tbl_TestStepsDetails WHERE [TestCaseDetailsId] = @TestStepsId)
    BEGIN
        SELECT [result] = JSON_QUERY((
           SELECT  [TestStepsDetailsId],
					[TestCaseDetailsId],
					[stepDescription],
					[action],
					[selectorValue],
					[selectorType],
					[sendKeyInput],
					[scrollPixel],
					[url],
					[selectedUser],
					[fileName],
					[elementValue],
					[cssValue],
					[cssProperty],
					[pageTitle],
					[currentUrl],
					[isOptional],
					[shouldNotEqualValue],
					[shouldIncludeValue],
					[shouldEqualValue],
					[shouldGreaterThanValue],
					[shouldLessValue],
					[containTextValue],
					[haveAttributeValue],
					[textValue],
					[wait]
		    FROM tbl_TestStepsDetails
            WHERE [TestCaseDetailsId] = @TestStepsId
            FOR JSON PATH
        ))
    END
    ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' AS [status], 
                   'TestCaseDetailsId not found' AS [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    SELECT [result] = JSON_QUERY((
        SELECT 'fail' AS [status], 
               ERROR_MESSAGE() AS [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestSuiteDetails]
@TestSuiteName			VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestSuiteDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	18 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestSuiteDetails 'Custom Test Suite'
**************************************************************************************/
BEGIN TRY
	SELECT [TestSuiteDetailsJson] = JSON_QUERY((
		SELECT DISTINCT [TestSuiteId], [TestSuiteName], [ApplicationId], [EnvironmentId], 
			JSON_QUERY((
				SELECT [Value] FROM STRING_SPLIT([SelectedTestCases],',') 
				FOR JSON PATH
			)) [SelectedTestCases]
		FROM tbl_TestSuites
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteDetailsJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestSuits]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestSuits
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestSuits
**************************************************************************************/
BEGIN TRY
	SELECT [TestSuites] = JSON_QUERY((
		SELECT [TestSuiteName],[TestSuiteFlag] FROM
		(SELECT DISTINCT [TestSuiteName] [TestSuiteName], 'InBuilt' [TestSuiteFlag]
		FROM tbl_TestCase WHERE [TestSuiteName] NOT IN (SELECT DISTINCT [TestSuiteName]
		FROM tbl_TestSuites)
		UNION
		SELECT DISTINCT [TestSuiteName] [TestSuiteName], 'Custom' [TestSuiteFlag]
		FROM tbl_TestSuites) tbl
	FOR JSON PATH)) 
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuites]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestSuitsByName]
@TestSuiteName VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestSuitsByName
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	18 Jan 2024
MODIFIED BY		:	25th April 2024
MODIFIED DATE	:	Mohammad Mobin
PROC EXEC		:
				EXEC stp_GetTestSuitsByName
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT
				[TestSuiteName],
				[TestSuiteType],
				JSON_QUERY((
					SELECT [ApplicationId], [ApplicationName]
					FROM tbl_Applications
					WHERE [ApplicationId] = t.[ApplicationId]
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
				)) [Application],
				[SendEmail],
				JSON_QUERY((
					SELECT [EnvironmentId], [EnvironmentName], [Baseurl], [BasePath], [DriverPath]
					FROM tbl_Environments
					WHERE EnvironmentId = t.[EnvironmentId]
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
				)) [Environment],
				JSON_QUERY((
					SELECT [TestUserId], [UserName], [PassWord]
					FROM tbl_TestUser
					WHERE Id = t.[TestUserId]
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER,INCLUDE_NULL_VALUES
				)) [TestUser],
				REPLACE([SelectedTestCases],' ','') [SelectedTestCases],
				[TestSuiteId],
				[Description]
		FROM tbl_TestSuites t
		WHERE TestSuiteName = @TestSuiteName
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [GetTestSuites]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetUserDetails]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetUserDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	28 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetUserDetails
**************************************************************************************/
BEGIN TRY
	SELECT [UsersListJson] = JSON_QUERY((
		SELECT [Id],
			[UserName],
			[Email],
			ISNULL([IsDisabled], 'false') [IsDisabled]
		FROM [dbo].[AspNetUsers]
		ORDER BY [UserName]
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [UsersListJson]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_InsertBuiltInTestSuiteDetails]
@DynamicObject			NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_InsertBuiltInTestSuiteDetails
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	15 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_InsertBuiltInTestSuiteDetails @DynamicObject
**************************************************************************************/
BEGIN TRY
	
	BEGIN
		INSERT INTO tbl_TestCase (
			TestSuiteName,
			TestRunName,
			TestCaseName,
			TestCaseStatus,
			TestCaseVideoURL,
			TestSuiteStartDateTime,
			TestSuiteEndDateTime,
			TestRunStartDateTime,
			TestRunEndDateTime,
			TestCaseSteps,
			TesterName,
			TestEnvironment)
		SELECT
			TestSuiteName,
			TestRunName,
			TestCaseName,
			TestCaseStatus,
			TestCaseVideoURL,
			CONVERT(datetimeoffset, TestSuiteStartDateTime),
			CONVERT(datetimeoffset, TestSuiteEndDateTime),
			CONVERT(datetimeoffset, TestRunStartDateTime),
			CONVERT(datetimeoffset, TestRunEndDateTime),
			TestCaseSteps,
			TesterName,
			TestEnvironment
		FROM OPENJSON(@DynamicObject) WITH (
			TestSuiteName NVARCHAR(100),
			TestRunName NVARCHAR(100),
			TestCaseName NVARCHAR(100),
			TestCaseStatus NVARCHAR(50),
			TestCaseVideoURL NVARCHAR(MAX),
			TestSuiteStartDateTime DATETIMEOFFSET,
			TestSuiteEndDateTime DATETIMEOFFSET,
			TestRunStartDateTime DATETIMEOFFSET,
			TestRunEndDateTime DATETIMEOFFSET,
			TestCaseSteps NVARCHAR(MAX),
			TesterName NVARCHAR(100),
			TestEnvironment NVARCHAR(50))
 END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Save Test Case Successfully' [message]
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
	SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], ERROR_MESSAGE() [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER 
		)) 
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_IsExecutionInProgress]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_IsExecutionInProgress
CREATED BY		:	Mohammed Mobin
CREATED DATE	:	22 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_IsExecutionInProgress
				
**************************************************************************************/
BEGIN TRY
	DECLARE @ExecutionInProgress INT = 0

	IF EXISTS(SELECT 1 FROM tbl_TestExecution WHERE [IsExecutionInProgress] = 1)
	BEGIN
		SET @ExecutionInProgress = 1
	END 
	
	SELECT @ExecutionInProgress [ExecutionInProgress]
END TRY
BEGIN CATCH
	SELECT @ExecutionInProgress [ExecutionInProgress]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_SaveCustomTestSuiteExecutionData]
@TestSuiteJson			NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_SaveCustomTestSuiteExecutionData
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	23 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_SaveCustomTestSuiteExecutionData '{"TestSuiteName":"Custom Test Suite-3","TestRunName":"TestRun-1",
					"TestCaseName":"VerifyLoginOK","TestCaseStatus":"Passed","TestCaseVideoURL":"\\Recordings\\2024-01-23\\2024-01-23_07-14-32.webm",
					"TestSuiteStartDateTime":"2024-01-23T19:14:31.8909134+05:30","TestSuiteEndDateTime":"2024-01-23T19:14:54.4617051+05:30",
					"TestRunStartDateTime":"2024-01-23T19:14:49.04712+05:30","TestRunEndDateTime":"2024-01-23T19:14:54.1651478+05:30",
					"TestCaseSteps":"[{\"Status\":\"Passed\",\"Timestamp\":\"23-Jan-2024 19:14:49.0471200+05:30\",\"Details\":\"wait for plage to loader\",\"FailureMessage\":null,\"FailureException\":null,\"FailureScreenShots\":null},
					{\"Status\":\"Passed\",\"Timestamp\":\"23-Jan-2024 19:14:49.4064360+05:30\",\"Details\":\"Click on Login Button\",\"FailureMessage\":null,\"FailureException\":null,\"FailureScreenShots\":null},{\"Status\":\"Passed\",\"Timestamp\":\"23-Jan-2024 19:14:
52.6804401+05:30\",\"Details\":\"Enter Email Test\",\"FailureMessage\":null,\"FailureException\":null,\"FailureScreenShots\":null},{\"Status\":\"Passed\",\"Timestamp\":\"23-Jan-2024 19:14:53.4712594+05:30\",\"Details\":\"Enter passoword test\",\"FailureMe
ssage\":null,\"FailureException\":null,\"FailureScreenShots\":null},{\"Status\":\"Passed\",\"Timestamp\":\"23-Jan-2024 19:14:54.0119291+05:30\",\"Details\":\"Click on Submit button Test\",\"FailureMessage\":null,\"FailureException\":null,\"FailureScreenSh
ots\":null}]",
					"TesterName":"admin@gmail.com","TestEnvironment":"dev"}'
				
**************************************************************************************/
BEGIN TRY
	IF @TestSuiteJson <> '' OR @TestSuiteJson IS NOT NULL
	BEGIN
		INSERT INTO tbl_TestCase ([TestSuiteName], [TestRunName], [TestCaseName], [TestCaseStatus], [TestCaseVideoURL], 
								  [TestSuiteStartDateTime], [TestSuiteEndDateTime], [TestRunStartDateTime], [TestRunEndDateTime], 
								  [TestCaseSteps], [TesterName], [TestEnvironment])
		SELECT
			TestSuiteName, TestRunName, TestCaseName, TestCaseStatus, TestCaseVideoURL,
			CONVERT(datetimeoffset, TestSuiteStartDateTime), CONVERT(datetimeoffset, TestSuiteEndDateTime),
			CONVERT(datetimeoffset, TestRunStartDateTime), CONVERT(datetimeoffset, TestRunEndDateTime),
			TestCaseSteps, TesterName, TestEnvironment
		FROM OPENJSON(@DynamicObject) WITH (
			TestSuiteName NVARCHAR(100),
			TestRunName NVARCHAR(100),
			TestCaseName NVARCHAR(100),
			TestCaseStatus NVARCHAR(50),
			TestCaseVideoURL NVARCHAR(MAX),
			TestSuiteStartDateTime DATETIMEOFFSET,
			TestSuiteEndDateTime DATETIMEOFFSET,
			TestRunStartDateTime DATETIMEOFFSET,
			TestRunEndDateTime DATETIMEOFFSET,
			TestCaseSteps NVARCHAR(MAX),
			TesterName NVARCHAR(100),
			TestEnvironment NVARCHAR(50))
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Test Suite is Blank' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Test Suite Saved Successfully' [message]
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
	SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], ERROR_MESSAGE() [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_SaveExecutionInProgress]
@TestSuiteName		VARCHAR(150),
@TestRunName		VARCHAR(150),
@TestCaseName		VARCHAR(150),
@TesterName			VARCHAR(150),
@TestEnvironment	VARCHAR(150)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateApplication
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	22 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddUpdateApplication
				
**************************************************************************************/
BEGIN TRY
	INSERT INTO tbl_TestExecution ([TestSuiteName], [TestRunName], [TestCaseName], [TestEnvironment], [TesterName], [ExecutionStartTime], [IsExecutionInProgress])
	SELECT @TestSuiteName, @TestRunName, @TestCaseName, @TestEnvironment, @TesterName, GETDATE(), 1
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE()
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_SaveTestSuites]
@TestSuiteName			VARCHAR(100),
@TestSuiteType			VARCHAR(100),
@ApplicationId			INT,
@SendEmail				VARCHAR(100),
@EnvironmentId			INT,
@SelectedTestCases		NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_SaveTestSuites
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	17 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  
				EXEC stp_SaveTestSuites
**************************************************************************************/
BEGIN TRY
	INSERT INTO tbl_TestSuites (TestSuiteName, TestSuiteType, ApplicationId, SendEmail, EnvironmentId, SelectedTestCases) 
	VALUES (@TestSuiteName, @TestSuiteType, @ApplicationId, @SendEmail, @EnvironmentId, @SelectedTestCases)

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Test Suite Saved Successfully' [message]
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
	SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], ERROR_MESSAGE() [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateExecutionInProgress]
@TestSuiteName		VARCHAR(150),
@TestRunName		VARCHAR(150),
@TestCaseName		VARCHAR(150),
@TesterName			VARCHAR(150),
@TestEnvironment	VARCHAR(150)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateExecutionInProgress
CREATED BY		:	Mohammed Mobin
CREATED DATE	:	22 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateExecutionInProgress
				
**************************************************************************************/
BEGIN TRY
	UPDATE tbl_TestExecution
		SET [IsExecutionInProgress] = 0
	WHERE [TestSuiteName] = @TestSuiteName
	  AND [TestRunName] = @TestRunName
	  AND [TestCaseName] = @TestCaseName
	  AND [TestEnvironment]	= @TestEnvironment
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE()
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateExecutionInProgressFlag]
@TestSuiteName		VARCHAR(150),
@TestRunName		VARCHAR(150),
@TestCaseName		VARCHAR(150),
@TesterName			VARCHAR(150),
@TestEnvironment	VARCHAR(150)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateExecutionInProgressFlag
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	22 Feb 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateExecutionInProgressFlag
				
**************************************************************************************/
BEGIN TRY
	UPDATE tbl_TestExecution
		SET [IsExecutionInProgress] = 0
	WHERE [TestSuiteName]	= @TestSuiteName
	  AND [TestRunName]		= @TestRunName
	  AND [TestCaseName]	= @TestCaseName
	  AND [TestEnvironment]	= @TestEnvironment
	  AND [TesterName]		= @TesterName
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE()
END CATCH
GO
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
GO
CREATE OR ALTER   PROCEDURE [dbo].[stp_UpdateProjectRootRelation]
@Id             int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	9th April 2024
PROC EXEC		:  EXEC stp_UpdateProjectRootRelation 
				
**************************************************************************************/
BEGIN TRY
IF EXISTS( SELECT 1 FROM [dbo].[tbl_ProjectRootRelation] WHERE [Id] <> @Id AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		UPDATE [dbo].[tbl_ProjectRootRelation]
		SET 
			Name      = @Name
			WHERE Id  = @Id
   END
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT Id [id], ParentId [parentId], [Name] [name]
						FROM tbl_ProjectRootRelation where Id  = @Id
						FOR JSON PATH
					))
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
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH
GO
CREATE OR ALTER   PROCEDURE [dbo].[stp_UpdateRootRelation]
@RootId         int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	3rd March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	9th April 2024
PROC EXEC		:  EXEC stp_UpdateRootRelation 
				
**************************************************************************************/
BEGIN TRY
IF EXISTS( SELECT 1 FROM [dbo].[tbl_RootRelation] WHERE [RootId] <> @RootId AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		UPDATE [dbo].[tbl_RootRelation]
		SET 
			Name    = @Name
			WHERE RootId  = @RootId
    END
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT RootId [id], Parent [parentId], [Name] [name]
						FROM tbl_RootRelation where RootId  = @RootId
						FOR JSON PATH
					))
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
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateTestCaseDetails]
@TestCaseDetailsId         INT,
@StartUrl                  VARCHAR(100),
@TestCaseName              VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateTestCaseDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22nd March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateTestCaseDetails 
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_TestCaseDetails WHERE [TestCaseDetailsId] != @TestCaseDetailsId AND [TestCaseName] = @TestCaseName)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Test Case Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE
	BEGIN
		UPDATE tbl_TestCaseDetails
		SET [TestCaseName]   = @TestCaseName,
			[StartUrl]       = @StartUrl
			WHERE [TestCaseDetailsId] = @TestCaseDetailsId
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT TestCaseDetailsId [id], RootId [rootId], [TestCaseName] [testCaseName], [StartUrl] [startUrl]
						FROM tbl_TestCaseDetails where TestCaseDetailsId = @TestCaseDetailsId
						FOR JSON PATH
					))
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateUserProfile]
@FullName		        VARCHAR(100),
@OrganizationName		VARCHAR(100),
@Email		            VARCHAR(100),
@Id			            NVARCHAR(450)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateUserProfile
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	22 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateUserProfile 
**************************************************************************************/
BEGIN TRY
		UPDATE [dbo].[AspNetUsers]
			SET  [FullName]            = @FullName,
				 [UserName]            = @Email,
				 [NormalizedUserName]  = UPPER(@Email),
				 [Email]               = @Email,
				 [NormalizedEmail]     = UPPER(@Email),
			     [OrganizationName]    = @OrganizationName
		WHERE [Id] = @Id
 
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Profile Updated Successfully' [message]
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
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_ValidateUser]
@UserName			VARCHAR(100),
@Password			NVARCHAR(1000)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_ValidateUser
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	01 Jan 2023
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_ValidateUser 'admin@gmail.com', 'Admin@123'
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT * FROM AspNetUsers WHERE [UserName] = @UserName AND [PasswordHash] = @Password)
	BEGIN
		SELECT 'Success' [isValidUser], 
				[UserDetails] = JSON_QUERY((
					SELECT 
						UserName,  
						 REPLACE(CONCAT(UPPER(SUBSTRING(UserName, 1, 1)), LOWER(SUBSTRING(UserName, 2, CHARINDEX('@', UserName) - 1))),'@','') [Name]
					FROM AspNetUsers WHERE [UserName] = @UserName AND [PasswordHash] = @Password
					FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
				))
	END
	ELSE
	BEGIN
		SELECT 'User Name or Password is wrong' [isValidUser]
	END
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [isValidUser]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetLocation]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetLocation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	15 March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetLocation
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id],
			   [CountryName] as [Name]
		FROM tbl_Location
		ORDER BY CountryName
		FOR JSON PATH
	))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [result]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetFunctionalTest]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetFunctionalTest
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	18th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetFunctionalTest
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [RootId] AS [id], 
		       ISNULL([Node], '') AS [node],
               ISNULL([Parent], '') AS [parentId],
               ISNULL([Name], '') AS [name]
		FROM tbl_FuncationalTest
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [FuncationalTest]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_AddFunctionalTest]
@RootId         int = 0,
@Node		    int,
@Parent	        int,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddFunctionalTest
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	18th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddFunctionalTest 0,0,0,'Test Nitin Workspace'
				
**************************************************************************************/
BEGIN TRY
 IF EXISTS( SELECT 1 FROM [dbo].[tbl_FuncationalTest] WHERE [Parent] = @Parent AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		INSERT INTO [dbo].[tbl_FuncationalTest] ([Node], [Parent], [Name]) 
		VALUES (@Node, @Parent, @Name)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], 'successfully Added' [message],
					[Data] = JSON_QUERY((
						SELECT RootId [id], Parent [parentId], [Name] [name]
						FROM tbl_FuncationalTest where RootId = SCOPE_IDENTITY()
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
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateFunctionalTest]
@RootId         INT,
@Name           NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateFunctionalTest
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	18th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateFunctionalTest 
				
**************************************************************************************/
BEGIN TRY
IF EXISTS( SELECT 1 FROM [dbo].[tbl_FuncationalTest] WHERE [RootId] <> @RootId AND [Name] = @Name)
BEGIN
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], 'Duplicate Work Space Name' [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END
ELSE
	BEGIN
		UPDATE [dbo].[tbl_FuncationalTest]
		SET 
			Name    = @Name
			WHERE RootId  = @RootId
    END
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'Updated Successfully' [message],
				[Data] = JSON_QUERY((
						SELECT RootId [id], Parent [parentId], [Name] [name]
						FROM tbl_FuncationalTest where RootId  = @RootId
						FOR JSON PATH
					))
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
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteFunctionalTest]
@RootId           INT,
@ParentId         INT
AS
/**************************************************************************************
PROCEDURE NAME   : stp_DeleteFunctionalTest
CREATED BY       : Mohammed Yaseer
CREATED DATE     : 20th April 2024
MODIFIED BY      : 
MODIFIED DATE    : 
PROC EXEC        :
                  EXEC stp_DeleteFunctionalTest 1
**************************************************************************************/
BEGIN TRY
    -- Common Table Expression to select all nodes and child nodes
    ;WITH ALL_NODE_CHILDNODES AS (
        SELECT [RootId], [Parent], [Name]
        FROM tbl_FuncationalTest
        WHERE [RootId] = @RootId

        UNION ALL

        SELECT trr.[RootId], trr.[Parent], trr.[Name]
        FROM tbl_FuncationalTest trr
        INNER JOIN ALL_NODE_CHILDNODES CN ON trr.[Parent] = CN.[RootId]
    )
    -- Deleting all related nodes
    DELETE FROM tbl_FuncationalTest
    WHERE [RootId] IN (SELECT [RootId] FROM ALL_NODE_CHILDNODES);

    -- Deleting the root node
    DELETE FROM tbl_FuncationalTest WHERE [RootId] = @RootId;

    IF @@ERROR = 0
    BEGIN
        -- Return success message if deletion is successful
        SELECT [result] = JSON_QUERY((
            SELECT 'success' [status], 'Deleted Successfully' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
    ELSE
    BEGIN
        -- Return error message if deletion fails
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' [status], 'Deletion failed' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    -- Return error message if an exception is caught
    SELECT [result] = JSON_QUERY((
        SELECT 'error' [status], ERROR_MESSAGE() [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
GO
CREATE OR ALTER  PROCEDURE [dbo].[stp_GetTestRunData]
@TestSuitName VARCHAR(100),
@TestRunName  VARCHAR(100)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestRunData
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	23th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestRunData 'Mississippi', 'TestRun-33'
**************************************************************************************/
BEGIN TRY
	SELECT [RunDetailsJson] = JSON_QUERY ((
										SELECT
												t1.[TestSuiteName],
												t1.[TestRunName],
												FORMAT(MIN(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET)),'dd-MMM-yyyy HH:mm:ss') AS [TestRunStartDateTime],
												FORMAT(MAX(CAST(t1.[TestRunEndDateTime] AS DATETIMEOFFSET)), 'dd-MMM-yyyy HH:mm:ss') AS [TestRunEndDateTime],
												COUNT(t1.[TestCaseName]) AS [TotalTestCases],
												(SELECT COUNT([TestCaseStatus]) FROM tbl_TestCase WHERE [TestCaseStatus] LIKE '%Passed%' AND [TestSuiteName] = t1.[TestSuiteName] AND [TestRunName] = t1.[TestRunName]) AS [PassedTestCases],
												(SELECT COUNT([TestCaseStatus]) FROM tbl_TestCase WHERE [TestCaseStatus] LIKE '%Failed%' AND [TestSuiteName] = t1.[TestSuiteName] AND [TestRunName] = t1.[TestRunName]) AS [FailedTestCases],
												CASE
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) = 0 THEN 'Failed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) = 0 THEN 'Passed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) >
														 SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) THEN 'Partially Passed'
													WHEN SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Passed%' THEN 1 ELSE 0 END) <
														 SUM(CASE WHEN t1.[TestCaseStatus] LIKE '%Failed%' THEN 1 ELSE 0 END) THEN 'Partially Failed'
													ELSE 'Partially Passed'
												END AS [TestRunStatus]
											FROM
												tbl_TestCase t1
											WHERE
												t1.[TestSuiteName] = @TestSuitName
												AND t1.TestRunName = @TestRunName
											GROUP BY t1.[TestSuiteName], t1.[TestRunName]
											ORDER BY MIN(CAST(t1.[TestRunStartDateTime] AS DATETIMEOFFSET)) DESC
											FOR JSON PATH , WITHOUT_ARRAY_WRAPPER 
											))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestSuiteName]
END CATCH
GO
CREATE OR ALTER PROCEDURE [dbo].[stp_GetAllTestUser]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetAllTestUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	24th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetAllTestUser
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id] AS [UserId], 
		       [UserName],
			   [Password],
			   [IsDeleted],
			   [CreatedBy],
			   [CreatedOn],
               [ModifiedBy],
			   [ModifiedOn]
		FROM tbl_TestUser
		WHERE IsDeleted = 0
	FOR JSON PATH, INCLUDE_NULL_VALUES))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestUser]
END CATCH
Go
CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestUserById]
@Id             INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestUserById
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	24th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestUserById
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id] AS [UserId],
		       [UserName],
			   [Password],
			   [IsDeleted],
			   [CreatedBy],
			   [CreatedOn],
               [ModifiedBy],
			   [ModifiedOn]
		FROM tbl_TestUser
		WHERE Id = @Id
	FOR JSON PATH, INCLUDE_NULL_VALUES, WITHOUT_ARRAY_WRAPPER))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestUser]
END CATCH
Go
CREATE OR ALTER PROCEDURE [dbo].[stp_AddTestUser]
@Id                       INT,		
@UserName                 NVARCHAR(MAX),
@Password	              NVARCHAR(MAX),
@CreatedBy				  NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	25th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddTestUser 
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS( SELECT 1 FROM [tbl_TestUser] WHERE [UserName] = @UserName AND [Id] <> @Id)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate User Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @Id = 0
	BEGIN
		INSERT INTO [dbo].[tbl_TestUser] ([UserName],[Password], [IsDeleted], [CreatedBy], [CreatedOn], [ModifiedBy],[ModifiedOn]) 
		VALUES (@UserName, @Password, 0, @CreatedBy, GETDATE(), NULL, NULL)
		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'User Name Saved Successfully' [message]
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
	ELSE
	BEGIN 
		UPDATE [dbo].[tbl_TestUser]
			SET  [UserName]      = @UserName,
			     [Password]      = @Password,
				 [ModifiedBy]    = @CreatedBy,
				 [ModifiedOn]    = GETDATE()
		   WHERE [Id] = @Id

		IF @@ERROR = 0
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'success' [status], 'User Name Updated Successfully' [message]
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
Go
CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteTestUser]
@Id			INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteTestUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	25th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteTestUser 
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM [tbl_TestUser] WHERE [Id] = @Id)
	BEGIN
		DELETE FROM [tbl_TestUser] WHERE [Id] = @Id
	END
	ELSE
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Test User not available' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END

	IF @@ERROR = 0
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'success' [status], 'Test User Deleted Successfully' [message]
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
	SELECT ERROR_MESSAGE() [TestUserJson]
END CATCH
GO