using System;
using System.Collections.Generic;

namespace MyersAndStaufferFramework
{
    public class TestData
    {
        public string TestSuiteName { get; set; }
        public string TestRunName { get; set; }
        public string TestCaseName { get; set; }
        public string TestCaseStatus { get; set; }
        public string TestCaseVideoURL { get; set; }
        public string TestFailureMessage { get; set; }
        public string TestFailureScreenShot { get; set; }
        public string TestCaseSteps { get; set; }
        public DateTime? TestRunStartDateTime { get; set; }
        public DateTime? TestRunEndDateTime { get; set; }
        public string TesterName { get; set; }
        public string TestEnvironment { get; set; }
    }

    public class TestStepColumns
    {
        public string Status { get; set; }
        public DateTime Timestamp { get; set; }
        public string Details { get; set; }
    }

    public static class TestDataSharedInstance
    {
        public static TestData testData { get; } = new TestData();
    }
}
