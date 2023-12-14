using System;

namespace SeleniumTestReport.DTO_s
{
    public class Dto_TestRunDetails
    {
        public string TestRun { get; set; }
        public string TestCaseName { get; set; }
        public string TestRunStatus { get; set; }
        public string TestFailureMessage { get; set; }
        public string TestFailureScreenShot { get; set; }
        public string TestStartDate { get; set; }
        public string TestEndDate { get; set; }
        public string TestSteps { get; set; }
    }
}