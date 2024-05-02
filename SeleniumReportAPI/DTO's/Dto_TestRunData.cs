using Newtonsoft.Json;

namespace SeleniumReportAPI.DTO_s
{
    public class Dto_TestRunData
    {
        public string TestSuiteName { get; set; }
        public string TestRunName { get; set; }
        public string TestRunStartDateTime { get; set; }
        public string TestRunEndDateTime { get; set; }
        public int TotalTestCases { get; set; }
        public string PassedTestCases { get; set; }
        public string FailedTestCases { get; set; }
        public string TestRunStatus { get; set; }

    }
}