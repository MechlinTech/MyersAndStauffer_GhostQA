CREATE OR ALTER PROCEDURE [dbo].[stp_AddUpdateTestSuites]
@TestSuiteName			VARCHAR(100),
@TestSuiteType			VARCHAR(100),
@ApplicationId			INT,
@SendEmail				BIT,
@EnvironmentId			INT,
@SelectedTestCases		NVARCHAR(MAX),
@Description			NVARCHAR(MAX) = '',
@TestSuiteId			INT = 0,
@TestUserId				INT,
@RootId					INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateTestSuites
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	15 Jan 2024
MODIFIED BY		:	Lokesh
MODIFIED DATE	:	12th June, 2024
PROC EXEC		:
				EXEC stp_AddUpdateTestSuites 'Mississippi', 0
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName AND [TestSuiteId] <> @TestSuiteId AND [RootId] = @RootId)
	BEGIN
		SELECT [result] = JSON_QUERY((
			SELECT 'fail' [status], 'Duplicate Custom Test Suite Name' [message]
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		))
	END
	ELSE IF @TestSuiteId = 0
	BEGIN
		IF NOT EXISTS(SELECT 1 FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName AND [TestSuiteId] <> @TestSuiteId AND [RootId] = @RootId)
		BEGIN
			INSERT INTO tbl_TestSuites (TestSuiteName, TestSuiteType, ApplicationId, SendEmail, EnvironmentId, SelectedTestCases, [Description], [TestUserId], [RootId]) 
			VALUES (@TestSuiteName, @TestSuiteType, @ApplicationId, @SendEmail, @EnvironmentId, @SelectedTestCases, @Description, @TestUserId, @RootId)

			INSERT INTO dbo.tbl_FunctionalSuiteRelation ([Name], Parent, IsCustomSuite)
			VALUES (@TestSuiteName, @RootId, 1)
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
		DECLARE @OldTestSuiteName VARCHAR(200);
		SELECT 
		@OldTestSuiteName = TestSuiteName 
		FROM tbl_TestSuites
		WHERE [TestSuiteId] = @TestSuiteId
		AND [RootId] = @RootId;

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
		AND [RootId] = @RootId

		UPDATE dbo.tbl_FunctionalSuiteRelation
		SET [Name] = @TestSuiteName
		WHERE Parent = @RootId

		UPDATE tbl_TestCase
		SET TestSuiteName = @TestSuiteName
		WHERE TestSuiteName = @OldTestSuiteName

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