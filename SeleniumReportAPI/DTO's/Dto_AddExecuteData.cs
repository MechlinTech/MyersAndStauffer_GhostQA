namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddExecuteData
    {
        public string TestSuite { get; set; }
        public string TestCase { get; set; }
        public string TestCaseName { get; set; }
        public string Status { get; set; }
        public string StartDateTime { get; set; }
        public string EndDateTime { get; set; }
        public string TestStepJson { get; set; }
        public string SuiteDuration { get; set; }
        public string TestDuration { get; set; }
        public string TestScreenShot { get; set; }
        public string TesterName { get; set; }
        public string TestVideoUrl { get; set; }

    }
}