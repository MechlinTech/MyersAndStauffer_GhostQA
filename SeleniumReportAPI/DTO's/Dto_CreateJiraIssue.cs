namespace SeleniumReportAPI.DTO_s
{
    public class Dto_CreateJiraIssue
    {
        public Fields Fields { get; set; }
        public string UserId { get; set; }
    }
    public class IssueType
    {
        public string Id { get; set; }
    }

    public class Project
    {
        public string Id { get; set; }
    }

    public class Fields
    {
        public IssueType IssueType { get; set; }
        public Project Project { get; set; }
        public string Summary { get; set; }
    }
}
