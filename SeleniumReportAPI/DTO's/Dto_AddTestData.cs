namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddTestData
    {
        public int Id { get; set; }
        public int PerformanceFileId { get; set; }
        public IFormFile File { get; set; }
    }
}
