CREATE OR ALTER TRIGGER tr_after_delete_testcasedetails
ON tbl_TestCaseDetails
AFTER DELETE
AS
BEGIN
	DECLARE @TestCaseDetailsId INT;

	SELECT @TestCaseDetailsId = TestCaseDetailsId 
	FROM DELETED

	DELETE FROM tbl_CypressTestExecution
	WHERE [TestCaseDetailsId] = @TestCaseDetailsId
END;