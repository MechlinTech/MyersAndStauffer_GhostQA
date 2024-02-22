namespace SeleniumReportAPI.DTO_s
{
    public class Dto_TestSteps
    {
        public string Status { get; set; }
        public string TimeStamp { get; set; }
        public string Details { get; set; }
        public string FailureMessage { get; set; }
        public string FailureException { get; set; }
        public string FailureScreenShots { get; set; }
    }
}