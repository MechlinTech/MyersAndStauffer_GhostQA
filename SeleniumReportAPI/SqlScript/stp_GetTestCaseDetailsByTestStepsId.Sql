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
				EXEC stp_GetTestStepsDetailsByTestStepsId
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
					[textValue]
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
