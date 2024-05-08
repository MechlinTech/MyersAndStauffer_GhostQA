CREATE OR ALTER   PROCEDURE [dbo].[stp_GetExcutedByRootId]
@RootId           Int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetExcutedByRootId
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	5th March 2024
MODIFIED BY		:	Mohammad Yasser
MODIFIED DATE	:	4th April 2024
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
										tsd.[IsOptional],
										CASE WHEN tsd.[Action] = 'type' OR tsd.[Action] = 'Wait' THEN tsd.[TextValue] ELSE NULL END AS [duration],
										(CASE WHEN tsd.[Action] = 'scroll_to_window' THEN SUBSTRING(tsd.[ScrollPixel], CHARINDEX('(', tsd.[ScrollPixel]) + 1, CHARINDEX(',', tsd.[ScrollPixel]) - CHARINDEX('(', tsd.[ScrollPixel]) - 1) END) [x_position],
                                                (CASE WHEN tsd.[Action] = 'scroll_to_window' THEN SUBSTRING(tsd.[ScrollPixel], CHARINDEX(',', tsd.[ScrollPixel]) + 1, CHARINDEX(')', tsd.[ScrollPixel]) - CHARINDEX(',', tsd.[ScrollPixel]) - 1) END) [y_position]
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
