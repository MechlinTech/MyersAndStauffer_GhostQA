CREATE OR ALTER PROCEDURE [dbo].[stp_AddFunctionalTestRun]
@RootId                   INT,
@TestRunName	          NVARCHAR(MAX),
@TestRunDescription	      NVARCHAR(MAX),
@BuildVersion	          NVARCHAR(MAX),
@Environment	          NVARCHAR(MAX),
@Milestone	              NVARCHAR(MAX),
@AssignedTo	              NVARCHAR(MAX),
@TestCases	              NVARCHAR(MAX),
@CreatedBy	              NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddFunctionalTestRun
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_AddFunctionalTestRun 
				
**************************************************************************************/
BEGIN TRY
	BEGIN
		INSERT INTO [dbo].[tbl_FunctionalTestRun] ([RootId], [TestRunName], [TestRunDescription], [BuildVersion], [Environment], [Milestone], [AssignedTo], [TestCases], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) 
		VALUES (@RootId, @TestRunName, @TestRunDescription, @BuildVersion, @Environment, @Milestone, @AssignedTo, @TestCases, @CreatedBy, GETDATE(), NULL, NULL)
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