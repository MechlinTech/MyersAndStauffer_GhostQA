CREATE OR ALTER TRIGGER tr_after_update_testcasedetails_testcasename
ON tbl_TestCaseDetails
AFTER UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM INSERTED AS I 
	INNER JOIN DELETED AS D 
	ON I.TestCaseDetailsId = D.TestCaseDetailsId 
	WHERE I.TestCaseName <> D.TestCaseName)
    BEGIN
		DECLARE @TestCaseName VARCHAR(200), @TestCaseDetailsId INT;

		SELECT @TestCaseDetailsId = TestCaseDetailsId, 
		@TestCaseName = TestCaseName 
		FROM INSERTED

		UPDATE tbl_CypressTestExecution
		SET [TestCaseName] = @TestCaseName
		WHERE [TestCaseDetailsId] = @TestCaseDetailsId
    END
END;