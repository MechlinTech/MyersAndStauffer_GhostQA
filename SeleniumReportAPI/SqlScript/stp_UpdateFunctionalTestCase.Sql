CREATE OR ALTER PROCEDURE [dbo].[stp_UpdateFunctionalTestCase]
@Id                   INT,
@Status               NVARCHAR(MAX),
@ActualResult         NVARCHAR(MAX),
@updatedBy             NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_UpdateFunctionalTestCase
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:  EXEC stp_UpdateFunctionalTestCase 
				
**************************************************************************************/
BEGIN TRY
	IF EXISTS(SELECT 1 FROM tbl_FunctionalTestCase WHERE [Id] = @Id)
	BEGIN
		UPDATE tbl_FunctionalTestCase
		SET [Status]              = @Status,
			[ActualResult]        = @ActualResult,
            [UpdatedBy]           = @updatedBy,
			[UpdatedOn]			  = GETDATE()
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
	ELSE
    BEGIN
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' [status], 'Record with provided Id does not exist' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ));
    END
END TRY
BEGIN CATCH
	SELECT [result] = JSON_QUERY((
		SELECT 'fail' [status], ERROR_MESSAGE() [message]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	))
END CATCH