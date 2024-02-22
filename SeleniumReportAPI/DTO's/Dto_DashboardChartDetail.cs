using Newtonsoft.Json;

namespace SeleniumReportAPI.DTO_s
{
    public class Dto_DashboardChartDetail
    {
        [JsonProperty("TestSuitename")]
        public string TestSuitename { get; set; }

        [JsonProperty("TestRunStartDate")]
        public DateTime TestRunStartDate { get; set; }

        [JsonProperty("TotalTestCase")]
        public int TotalTestCase { get; set; }

        [JsonProperty("TotalPassedTestCase")]
        public int TotalPassedTestCase { get; set; }

        [JsonProperty("TotalFailedTestCase")]
        public int TotalFailedTestCase { get; set; }
    }
}