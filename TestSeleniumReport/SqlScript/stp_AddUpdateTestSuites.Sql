CREATE OR ALTER PROCEDURE stp_AddUpdateTestSuites
@TestSuiteName			VARCHAR(100),
@TestSuiteId			INT = 0
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddUpdateTestSuites
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	15 Jan 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_AddUpdateTestSuites 'Mississippi', 0
**************************************************************************************/
BEGIN TRY
	IF @TestSuiteId = 0
	BEGIN
		INSERT INTO tbl_TestSuites ([TestSuiteName])
		VALUES(@TestSuiteName)

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
		IF NOT EXISTS( SELECT 1 FROM tbl_TestSuites WHERE [TestSuiteName] = @TestSuiteName)
		BEGIN
			UPDATE tbl_TestSuites
				SET [TestSuiteName] = @TestSuiteName
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
		ELSE
		BEGIN
			SELECT [result] = JSON_QUERY((
				SELECT 'fail' [status], 'Duplicate Custom Test Suite Name' [message]
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