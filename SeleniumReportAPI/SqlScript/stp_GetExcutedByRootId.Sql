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
	SELECT [TestSuite] = JSON_QUERY((
	SELECT [Name],
	[TestCases] = JSON_QUERY((
		SELECT [TestCaseName], 
		[Actions] = JSON_QUERY((
			SELECT tsd.[TestStepsName] [Steps], tsd.[ActionName]
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
