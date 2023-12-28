using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace SeleniumTestReport.DTO_s
{
    public class Dto_RunDetailsList
    {
        [JsonProperty("TestRunDateYear")]
        public string TestRunDateYear { get; set; }

        [JsonProperty("RunDetails")]
        public List<RunDetail> RunDetails { get; set; }
    }

    public class RunDetail
    {
        [JsonProperty("TestSuiteName")]
        public string TestSuiteName { get; set; }

        [JsonProperty("TestRunName")]
        public string TestRunName { get; set; }

        [JsonProperty("TestRunStartDateTime")]
        public DateTime TestRunStartDateTime { get; set; }

        [JsonProperty("TestRunEndDateTime")]
        public DateTime TestRunEndDateTime { get; set; }

        [JsonProperty("TotalTestCases")]
        public int TotalTestCases { get; set; }

        [JsonProperty("PassedTestCases")]
        public int PassedTestCases { get; set; }

        [JsonProperty("FailedTestCases")]
        public int FailedTestCases { get; set; }

        [JsonProperty("TestRunStatus")]
        public string TestRunStatus { get; set; }
    }
}