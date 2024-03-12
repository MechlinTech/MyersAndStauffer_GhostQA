CREATE OR ALTER   PROCEDURE [dbo].[stp_GetExcutedByRootId]
@RootId           Int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetExcutedByRootId
CREATED BY		:	Mohammad Mobin
CREATED DATE	:	5th March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetExcutedByRootId
**************************************************************************************/
BEGIN TRY
	SELECT [testsuite] = JSON_QUERY((
		SELECT trr.[name],
		[beforeEach] = JSON_QUERY((
				SELECT  'visit' [type], tccd.[StartUrl] [selector]
				FROM tbl_TestCaseDetails tccd
				WHERE tccd.[RootId] = trr.[RootId]
				FOR JSON PATH)),
			[testCases] = JSON_QUERY((
				SELECT tcd.[TestCaseName] [name], 
				[actions] = JSON_QUERY((
					SELECT tsd.[Type] [type], tsd.[SelectorValue] [selector], tsd.[StepDescription] [text]
					FROM tbl_TestStepsDetails tsd
					WHERE tsd.[TestCaseDetailsId] = tcd.[TestCaseDetailsId]
				FOR JSON PATH))
			FROM tbl_TestCaseDetails tcd
			WHERE tcd.[RootId] = trr.[RootId]
		FOR JSON PATH))
	FROM tbl_RootRelation trr
	WHERE trr.RootId = @RootId
FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [Excute]
END CATCH
