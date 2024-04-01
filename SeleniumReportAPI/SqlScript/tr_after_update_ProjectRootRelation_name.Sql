CREATE OR ALTER TRIGGER tr_after_update_ProjectRootRelation_name
ON tbl_ProjectRootRelation
AFTER UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM INSERTED AS I 
	INNER JOIN DELETED AS D 
	ON I.Id = D.Id 
	WHERE I.[Name] <> D.[Name])
    BEGIN
		DECLARE @Name VARCHAR(200), @RootId INT;

		SELECT @RootId = Id, 
		@Name = [Name]
		FROM INSERTED

		UPDATE tbl_CypressPerfomanceDetaills
		SET [Name] = @Name
		WHERE [RootId] = @RootId
    END
END;