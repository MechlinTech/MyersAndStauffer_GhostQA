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
					ISNULL([stepDescription],'') AS [stepDescription],
					ISNULL([Action],'') AS [action],
					ISNULL([selectorValue],'') AS [selectorValue],
					ISNULL([selectorType],'') AS [selectorType],
					ISNULL([SendKeyInput],'') AS [sendKeyInput],
					ISNULL([ScrollPixel],'') AS [scrollPixel],
					ISNULL([Url],'') AS [Url],
					ISNULL([SelectedUser],'') AS [selectedUser],
					ISNULL([FileName],'') AS [fileName],
					ISNULL([ElementValue],'') AS [elementValue],
					ISNULL([CssValue],'') AS [cssValue],
					ISNULL([CssProperty],'') AS [cssProperty],
					ISNULL([PageTitle],'') AS [pageTitle],
					ISNULL([CurrentUrl],'') AS [currentUrl],
					ISNULL([isOptional],'') AS [isOptional],
					ISNULL([ShouldNotEqualValue],'') AS [shouldNotEqualValue],
					ISNULL([ShouldIncludeValue],'') AS [shouldIncludeValue],
					ISNULL([ShouldEqualValue],'') AS [shouldEqualValue],
					ISNULL([ShouldGreaterThanValue],'') AS [shouldGreaterThanValue],
					ISNULL([ShouldLessValue],'') AS [shouldLessValue],
					ISNULL([ContainTextValue],'') AS [containTextValue],
					ISNULL([HaveAttributeValue],'') AS [haveAttributeValue]
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
