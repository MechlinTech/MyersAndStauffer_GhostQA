namespace SeleniumReportAPI.DTO_s
{
    public class Dto_ExecutionPerformance
    {
        public int Id { get; set; }
        public string TestCaseName { get; set; }
        public string FilePath { get; set; }
        public int PerformanceFileId { get; set; }
        public int TotalUsers { get; set; }
        public int DurationInMinutes { get; set; }
        public int RampUpSteps { get; set; }
        public int RampUpTimeInSeconds { get; set; }
        public string FileName { get; set; }
    }
}