CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteFunctionalTest]
@RootId           INT,
@ParentId         INT
AS
/**************************************************************************************
PROCEDURE NAME   : stp_DeleteFunctionalTest
CREATED BY       : Mohammed Yaseer
CREATED DATE     : 20th April 2024
MODIFIED BY      : 
MODIFIED DATE    : 
PROC EXEC        :
                  EXEC stp_DeleteFunctionalTest 1
**************************************************************************************/
BEGIN TRY
    -- Common Table Expression to select all nodes and child nodes
    ;WITH ALL_NODE_CHILDNODES AS (
        SELECT [RootId], [Parent], [Name]
        FROM tbl_FuncationalTest
        WHERE [RootId] = @RootId

        UNION ALL

        SELECT trr.[RootId], trr.[Parent], trr.[Name]
        FROM tbl_FuncationalTest trr
        INNER JOIN ALL_NODE_CHILDNODES CN ON trr.[Parent] = CN.[RootId]
    )
    -- Deleting all related nodes
    DELETE FROM tbl_FuncationalTest
    WHERE [RootId] IN (SELECT [RootId] FROM ALL_NODE_CHILDNODES);

    -- Deleting the root node
    DELETE FROM tbl_FuncationalTest WHERE [RootId] = @RootId;

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