CREATE OR ALTER   PROCEDURE [dbo].[stp_GetTestStepsDetails]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestStepsDetails
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestStepsDetails
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT  [TestStepsDetailsId],
			    [TestCaseDetailsId],
                [ActionName],
                [Description],
                [IsOption],
				[SelectorType],
				[SelectorValue],
				[Text]
		FROM tbl_TestStepsDetails
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestStepsDetails]
END CATCH