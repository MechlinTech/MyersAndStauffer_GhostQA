CREATE OR ALTER PROCEDURE [dbo].[stp_GetUsersOrganizationByUserId]
@UserId          NVARCHAR(MAX)
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_GetUsersOrganizationByUserId
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	16 May 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_GetUsersOrganizationByUserId
**************************************************************************************/
BEGIN TRY
	SELECT [result] = JSON_QUERY((
		SELECT [Id], 
		       [UserId],
			   [LogoPath],
			   [Description],
               [CreatedBy],
               [CreatedOn],
			   [UpdatedBy],
               [UpdatedOn]
		FROM tbl_UsersOrganization
		WHERE UserId = @UserId
	FOR JSON PATH))
END TRY
BEGIN CATCH
	SELECT ERROR_MESSAGE() [UsersOrganization]
END CATCH