CREATE OR ALTER PROCEDURE [dbo].[stp_DeleteFunctionalSuiteRelation]
@RootId     INT
AS
/**************************************************************************************
PROCEDURE NAME   : stp_DeleteFunctionalSuiteRelation
CREATED BY       : Lokesh
CREATED DATE     : 14th June, 2024
MODIFIED BY      : 
MODIFIED DATE    : 
PROC EXEC        : EXEC stp_DeleteFunctionalSuiteRelation 0
**************************************************************************************/
BEGIN TRY
	IF OBJECT_ID('tempdb..#temp') IS NOT NULL
	BEGIN
		DROP TABLE #temp;
	END

    -- Common Table Expression to select all nodes and child nodes
    ;WITH ALL_NODE_CHILDNODES AS (
        SELECT [Id], [Parent], [Name], [IsCustomSuite]
        FROM dbo.tbl_FunctionalSuiteRelation
        WHERE [Id] = @RootId

        UNION ALL

        SELECT trr.[Id], trr.[Parent], trr.[Name], trr.[IsCustomSuite]
        FROM dbo.tbl_FunctionalSuiteRelation trr
        INNER JOIN ALL_NODE_CHILDNODES CN ON trr.[Parent] = CN.[Id]
    )

	SELECT * INTO #temp FROM ALL_NODE_CHILDNODES;

	DECLARE @ParentRootId INT;
	SELECT @ParentRootId = Parent FROM #temp WHERE IsCustomSuite = 1;

    -- Deleting all related nodes
    DELETE FROM dbo.tbl_FunctionalSuiteRelation WHERE [Id] IN (SELECT [Id] FROM #temp);

    -- Deleting the root node
    DELETE FROM dbo.tbl_FunctionalSuiteRelation WHERE [Id] = @RootId;

	--Deleting related custom suites
	DELETE FROM dbo.tbl_TestSuites WHERE RootId = @ParentRootId;

    IF @@ERROR = 0
    BEGIN
		DROP TABLE #temp
        -- Return success message if deletion is successful
        SELECT [result] = JSON_QUERY((
            SELECT 'success' [status], 'Deleted Successfully' [message]
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ))
    END
    ELSE
    BEGIN
		DROP TABLE #temp
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