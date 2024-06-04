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
        public Description description { get; set; }
        public IssueType issuetype { get; set; }
        public Project project { get; set; }
        public string summary { get; set; }
    }

    public class Description
    {
        public List<Content> content { get; set; }
        public string type { get; set; }
        public int version { get; set; }
    }

    public class Content
    {
        public List<ContentDetail> content { get; set; }
        public string type { get; set; }
    }

    public class ContentDetail
    {
        public string text { get; set; }
        public string type { get; set; }
        public List<Marks> marks { get; set; }
    }

    public class Marks
    {
        public string type { get; set; }
        public Attrs attrs { get; set; }
    }

    public class Attrs
    {
        public string href { get; set; }
    }
}
