CREATE OR ALTER PROCEDURE [dbo].[stp_GetTestUserById]
@Id             INT
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetTestUserById
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	24th April 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetTestUserById
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
		WHERE Id = @Id
	FOR JSON PATH, INCLUDE_NULL_VALUES, WITHOUT_ARRAY_WRAPPER))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [TestUser]
END CATCH