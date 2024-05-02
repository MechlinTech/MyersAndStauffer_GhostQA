CREATE OR ALTER PROCEDURE [dbo].[stp_AddFunctionalTestCase]
@RootId                 INT,
@TestCaseName	        INT,
@PreCondition	        INT,
@Steps                  NVARCHAR(MAX),
@ExpectedResult         NVARCHAR(MAX),
@CreatedBy              NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddFunctionalTestCase
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddFunctionalTestCase
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_FunctionalTestCase] ([RootId], [TestCaseName], [Status], [PreCondition], [Steps], [ExpectedResult], [ActualResult], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) 
		VALUES (@RootId, @TestCaseName, NULL, @PreCondition, @Steps, @ExpectedResult, NULL, @CreatedBy, GETDATE(), NULL, NULL)
		IF @@ERROR = 0
		BEGIN
			SELECT [Result] = JSON_QUERY((
				SELECT 'success' [status], 'successfully Added' [message]
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