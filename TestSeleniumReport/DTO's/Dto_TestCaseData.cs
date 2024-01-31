namespace TestSeleniumReport.DTO_s
{
    public class Dto_TestCaseData
    {
        public string TestSuiteName { get; set; }
        public string TestRunName { get; set; }
        public string TestCaseName { get; set; }
        public string TestCaseStatus { get; set; }
        public string TestCaseVideoURL { get; set; }
        public DateTime TestSuiteStartDateTime { get; set; }
        public DateTime TestSuiteEndDateTime { get; set; }
        public DateTime TestRunStartDateTime { get; set; }
        public DateTime TestRunEndDateTime { get; set; }
        public string TestCaseSteps { get; set; }
        public string TesterName { get; set; }
        public string TestEnvironment { get; set; }
    }

    //public class TestCaseStep
    //{
    //    public string Status { get; set; }
    //    public DateTime Timestamp { get; set; }
    //    public string Details { get; set; }
    //    public string FailureMessage { get; set; }
    //    public string FailureException { get; set; }
    //    public string FailureScreenShots { get; set; }
    //}
}