CREATE OR ALTER   PROCEDURE [dbo].[stp_GetTestCaseDetails]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestCaseDetailsLab
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	1st March 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestCaseDetailsLab
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [TestCaseDetailsId], 
		       ISNULL([RootId], '') AS [RootId],
               [TestCaseName]
		FROM tbl_TestCaseDetails
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestCaseDetails]
END CATCH