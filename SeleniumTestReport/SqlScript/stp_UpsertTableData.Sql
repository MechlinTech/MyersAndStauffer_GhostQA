CREATE OR ALTER PROCEDURE [dbo].[stp_UpsertTableData]
@DynamicObject			NVARCHAR(MAX),
@TableName				NVARCHAR(100)
AS
BEGIN TRY
	DECLARE @SqlQuery				NVARCHAR(MAX), 
			@ColumnsWithType		NVARCHAR(MAX), 
			@Columns				NVARCHAR(MAX), 
			@ColumnsJson			NVARCHAR(MAX), 
			@TableCreationQuery		NVARCHAR(MAX)
	DECLARE @JsonTable TABLE (ColumnName NVARCHAR(MAX), ColumnValue NVARCHAR(MAX))
	
	INSERT INTO @JsonTable (ColumnName, ColumnValue)
	SELECT [Key],[Value]
		FROM OPENJSON(@DynamicObject)

	IF OBJECT_ID(@TableName,'U') IS NULL
	BEGIN
		SELECT @ColumnsWithType = STRING_AGG('[' + [ColumnName] + '] NVARCHAR(1000)', ', ')
			FROM @JsonTable
		PRINT @ColumnsWithType

		SET @TableCreationQuery = CONCAT('CREATE TABLE ', @TableName, '(', @ColumnsWithType, ')')
		PRINT @TableCreationQuery
	
		EXEC sp_executesql @TableCreationQuery
	END

	SELECT @ColumnsJson = STRING_AGG(CONCAT('[',[ColumnName],']',' NVARCHAR(1000) ''$.' + [ColumnName]) , ''', ')
		FROM @JsonTable
	SET @ColumnsJson  = @ColumnsJson + ''''
	PRINT @ColumnsJson

	SELECT @Columns = STRING_AGG('[' + [ColumnName] + ']', ',')
		FROM @JsonTable
	PRINT @Columns

	SELECT @SqlQuery = CONCAT ( 'INSERT INTO ', @TableName ,'(', @Columns ,')','SELECT * FROM OPENJSON (''', @DynamicObject , ''') WITH (', @ColumnsJson , ')')
	PRINT @SqlQuery

	EXEC sp_executesql @SqlQuery
END TRY
BEGIN CATCH
	IF OBJECT_ID('tbl_Log','U') IS NULL
	BEGIN
		CREATE TABLE tbl_log ([ERROR_LINE] VARCHAR(1000), [ERROR_MESSAGE] VARCHAR(1000), [ERROR_SEVERITY] VARCHAR(100))
		INSERT INTO tbl_log
		SELECT ERROR_LINE(), ERROR_MESSAGE(), ERROR_SEVERITY()
	END
	ELSE
	BEGIN
		INSERT INTO tbl_log
		SELECT ERROR_LINE(), ERROR_MESSAGE(), ERROR_SEVERITY()
	END
END CATCH
