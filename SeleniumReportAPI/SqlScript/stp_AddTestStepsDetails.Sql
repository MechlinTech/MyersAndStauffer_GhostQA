CREATE OR ALTER   PROCEDURE [dbo].[stp_AddTestStepsDetails]
@AddStepsJson                 NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_AddTestStepsDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	Mohammed Yaseer
MODIFIED DATE	:	11th March 2024
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
				[stepDescription] NVARCHAR(50) '$.stepDescription',
				[isOptional] bit '$.isOptional',
				[selectorType] NVARCHAR(50) '$.selectorType',
				[selectorValue] NVARCHAR(50) '$.selectorValue',
				[sendKeyInput] NVARCHAR(50) '$.sendKeyInput',
				[scrollPixel] NVARCHAR(50) '$.scrollPixel',
				[url] NVARCHAR(50) '$.url',
				[selectedUser] NVARCHAR(50) '$.selectedUser',
				[fileName] NVARCHAR(50) '$.fileName',
				[elementValue] NVARCHAR(50) '$.elementValue',
				[cssValue] NVARCHAR(50) '$.cssValue',
				[cssProperty] NVARCHAR(50) '$.cssProperty',
				[pageTitle] NVARCHAR(50) '$.pageTitle',
				[currentUrl] NVARCHAR(50) '$.currentUrl',
				[shouldNotEqualValue] NVARCHAR(50) '$.shouldNotEqualValue',
				[shouldIncludeValue] NVARCHAR(50) '$.shouldIncludeValue',
				[shouldEqualValue] NVARCHAR(50) '$.shouldEqualValue',
				[shouldGreaterThanValue] NVARCHAR(50) '$.shouldGreaterThanValue',
				[shouldLessValue] NVARCHAR(50) '$.shouldLessValue',
				[containTextValue] NVARCHAR(50) '$.containTextValue',
				[haveAttributeValue] NVARCHAR(50) '$.haveAttributeValue',
				[textValue] NVARCHAR(50) '$.textValue',
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