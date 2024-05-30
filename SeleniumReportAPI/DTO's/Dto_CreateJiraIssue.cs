namespace SeleniumReportAPI.DTO_s
{
    public class Dto_CreateJiraIssue
    {
        public JiraCreateIssueModel jiraCreateIssueModel { get; set; }
        public string UserId { get; set; }
    }

    public class JiraCreateIssueModel
    {
        public Fields fields { get; set; }
    }

    public class IssueType
    {
        public string id { get; set; }
    }

    public class Project
    {
        public string id { get; set; }
    }

    public class Fields
    {
        public IssueType issuetype { get; set; }
        public Project project { get; set; }
        public string summary { get; set; }
    }
}
