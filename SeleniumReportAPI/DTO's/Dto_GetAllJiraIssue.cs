namespace SeleniumReportAPI.DTO_s
{
    public class Dto_GetAllJiraIssue
    {
        public List<Issue> issues { get; set; }
    }
    

    public class Issue
    {
        public string key { get; set; }
        public GetFields fields { get; set; }
    }

    public class GetFields
    {
        public string summary { get; set; }
        public IssueType issuetype { get; set; }
        public Project project { get; set; }
    }

}
