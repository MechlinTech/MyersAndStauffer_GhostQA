using Newtonsoft.Json;

namespace SeleniumReportAPI.DTO_s
{
    public class Dto_TestCaseDetailsObj : Dto_TestSuites
    {
        [JsonProperty("TestRunName")]
        public string TestRunName { get; set; }
        [JsonProperty("TotalTestCases")]
        public int TotalTestCases { get; set; }
        [JsonProperty("PassedTestCases")]
        public int PassedTestCases { get; set; }
        [JsonProperty("FailedTestCases")]
        public int FailedTestCases { get; set; }
        [JsonProperty("TestRunStartDateTime")]
        public DateTime TestRunStartDateTime { get; set; }
        [JsonProperty("TestRunEndDateTime")]
        public DateTime TestRunEndDateTime { get; set; }
        [JsonProperty("TestEnvironment")]
        public string TestEnvironment { get; set; }
        [JsonProperty("TesterName")]
        public string TesterName { get; set; }
        [JsonProperty("TestCaseDetailsList")]
        public List<TestCaseDetail> TestCaseDetailsList { get; set; }
    }

    public class TestCaseDetail : Dto_TestSuites
    {
        [JsonProperty("TestRunName")]
        public string TestRunName { get; set; }
        [JsonProperty("TestCaseName")]
        public string TestCaseName { get; set; }
        [JsonProperty("TestCaseStatus")]
        public string TestCaseStatus { get; set; }
        [JsonProperty("TestCaseVideoURL")]
        public string TestCaseVideoURL { get; set; }
        [JsonProperty("TestRunStartDateTime")]
        public DateTime TestRunStartDateTime { get; set; }
        [JsonProperty("TestRunEndDateTime")]
        public DateTime TestRunEndDateTime { get; set; }
    }
}