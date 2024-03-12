CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteProjectRootRelation]
@Id			    Int,
@ParentId		Int
AS
/**************************************************************************************
PROCEDURE NAME	:	stp_DeleteProjectRootRelation
CREATED BY		:	Mohammed Yaseer
CREATED DATE	:	8th Mar 2024
MODIFIED BY		:	
MODIFIED DATE	:	
PROC EXEC		:
				EXEC stp_DeleteProjectRootRelation 1
**************************************************************************************/
BEGIN TRY
    -- Common Table Expression to select all nodes and child nodes
    ;WITH ALL_NODE_CHILDNODES AS (
        SELECT [Id], [ParentId], [Name]
        FROM tbl_ProjectRootRelation
        WHERE [Id] = @Id

        UNION ALL

        SELECT trr.[Id], trr.[ParentId], trr.[Name]
        FROM tbl_ProjectRootRelation trr
        INNER JOIN ALL_NODE_CHILDNODES CN ON trr.[ParentId] = CN.[Id]
    )
    -- Deleting all related nodes
    DELETE FROM tbl_ProjectRootRelation
    WHERE [Id] IN (SELECT [Id] FROM ALL_NODE_CHILDNODES);

    -- Deleting the root node
    DELETE FROM tbl_ProjectRootRelation WHERE [Id] = @Id;

    IF @@ERROR = 0
    BEGIN
        -- Return success message if deletion is successful
        SELECT [result] = JSON_QUERY((
            SELECT 'success' [status], 'Deleted Successfully' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
    ELSE
    BEGIN
        -- Return error message if deletion fails
        SELECT [result] = JSON_QUERY((
            SELECT 'fail' [status], 'Deletion failed' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
END TRY
BEGIN CATCH
    -- Return error message if an exception is caught
    SELECT [result] = JSON_QUERY((
        SELECT 'error' [status], ERROR_MESSAGE() [message]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ))
END CATCH
