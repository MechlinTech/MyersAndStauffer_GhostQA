using Newtonsoft.Json;

namespace SeleniumReportAPI.DTO_s
{
    public class IssueLinkOnJira
    {
        public IssueLink IssueLink { get; set; }
        public string UserId { get; set; }
    }
    public class IssueLink
    {
        [JsonProperty("inwardIssue")]
        public IssueKey InwardIssue { get; set; }

        [JsonProperty("outwardIssue")]
        public IssueKey OutwardIssue { get; set; }

        [JsonProperty("type")]
        public LinkType Type { get; set; }
    }
    public class IssueKey
    {
        [JsonProperty("key")]
        public string Key { get; set; }
    }

    public class LinkType
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
