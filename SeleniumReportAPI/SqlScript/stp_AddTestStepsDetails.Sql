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

		INSERT INTO tbl_TestStepsDetails([TestCaseDetailsId], [SelectedModifierKey], [StepDescription], [Type], [SelectorType], [SelectorValue], [VariableName],
		[Accessibility], [AccessibilityModifier], [AssignInputValue], [ClickType], [ElementSelector], [ExecuteJavaScript], [ExitTestStatus], [ExtractVariable], [ImportingStepFrom], [IsOptional], [JavaScriptCode], [JavascriptVariable], [KeyPressValue], [NavigateTo], [PauseTime], [SelectedDragDroptype], [VariableInput])
		SELECT 
			JSON_VALUE(@AddStepsJson, '$.testCaseID'),
			action.[selectedModifierKey],
			action.[stepDescription],
			action.[type],
			action.[selectorType],
			action.[selectorValue],
			action.[variableName],
			action.[accessibility],
			action.[accessibilityModifier],
			action.[assignInputValue],
			action.[clickType],
			action.[elementSelector],
			action.[executeJavaScript],
			action.[exitTestStatus],
			action.[extractVariable],
			action.[importingStepFrom],
			action.[isOptional],
			action.[javaScriptCode],
			action.[javaScriptVariable],
			action.[keyPressValue],
			action.[navigateTo],
			action.[pauseTime],
			action.[selectedDragDropType],
			action.[variableInput]
		FROM 
			OPENJSON(@AddStepsJson, '$.actions') 
			WITH (
				[selectedModifierKey] NVARCHAR(50) '$.selectedModifierKey',
				[stepDescription] NVARCHAR(50) '$.stepDescription',
				[type] NVARCHAR(50) '$.type',
				[selectorType] NVARCHAR(50) '$.selectorType',
				[selectorValue] NVARCHAR(50) '$.selectorValue',
				[variableName] NVARCHAR(50) '$.variableName',
				[accessibility] NVARCHAR(50) '$.accessibility',
				[accessibilityModifier] NVARCHAR(50) '$.accessibilityModifier',
				[assignInputValue] NVARCHAR(50) '$.assignInputValue',
				[clickType] NVARCHAR(50) '$.clickType',
				[elementSelector] NVARCHAR(50) '$.elementSelector',
				[executeJavaScript] NVARCHAR(50) '$.executeJavaScript',
				[exitTestStatus] NVARCHAR(50) '$.exitTestStatus',
				[extractVariable] NVARCHAR(50) '$.extractVariable',
				[importingStepFrom] NVARCHAR(50) '$.importingStepFrom',
				[isOptional] bit '$.isOptional',
				[javaScriptCode] NVARCHAR(50) '$.javaScriptCode',
				[javaScriptVariable] NVARCHAR(50) '$.javaScriptVariable',
				[keyPressValue] NVARCHAR(50) '$.keyPressValue',
				[navigateTo] NVARCHAR(50) '$.navigateTo',
				[pauseTime] NVARCHAR(50) '$.pauseTime',
				[selectedDragDropType] NVARCHAR(50) '$.selectedDragDropType',
				[variableInput] NVARCHAR(50) '$.variableInput'
			) AS action;
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