SET QUOTED_IDENTIFIER ON;

IF NOT EXISTS(SELECT TOP 1 * FROM [AspNetUsers])
BEGIN
    INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount],  [FullName], [OrganizationName], [IsDisabled]) 
    VALUES (N'5782a89b-3714-4a0d-88f0-8f5b9435454c', N'admin@gmail.com', N'ADMIN@GMAIL.COM', N'admin@gmail.com', N'ADMIN@GMAIL.COM', 1, N'AQAAAAEAACcQAAAAEF9od4ctb7cCtxt+Zgt+CfHmvDi2110P+vpVyp0lu3UzouCAuABPxS/6MlQlBL3YRA==', N'FSOXQWQ74ENCJSXTOUB7DEYA7IQBC727', N'72ca7ec6-bb75-4781-88e7-f0c573ba0e53', NULL, 0, 0, NULL, 1, 0,  NULL, NULL, 0)
END;
