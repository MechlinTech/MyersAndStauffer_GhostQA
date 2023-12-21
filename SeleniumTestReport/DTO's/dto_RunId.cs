using System;

namespace SeleniumTestReport.DTO_s
{
    public class Dto_RunId
    {
        public string TestSuiteName { get; set; }
        public string RunId { get; set; }
        public int TotalTestCases { get; set; }
        public string TestRunStatus { get; set; }
        public DateTime RunStartDateTime { get; set; }
        public DateTime? RunEndDateTime { get; set; }
    }
}