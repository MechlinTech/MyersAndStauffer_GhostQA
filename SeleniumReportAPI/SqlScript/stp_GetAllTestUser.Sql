CREATE OR ALTER PROCEDURE [dbo].[stp_GetAllTestUser]
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetAllTestUser
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	24th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetAllTestUser
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id] AS [UserId], 
		       [UserName],
			   [Password],
			   [IsDeleted],
			   [CreatedBy],
			   [CreatedOn],
               [ModifiedBy],
			   [ModifiedOn]
		FROM tbl_TestUser
		WHERE IsDeleted = 0
	FOR JSON PATH, INCLUDE_NULL_VALUES))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestUser]
END CATCH