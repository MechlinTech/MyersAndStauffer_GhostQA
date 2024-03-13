namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddPerformance
    {
        public int Id { get; set; }
        public int RootId { get; set; }
        public string TestCaseName { get; set; }
        public string FileName { get; set; }
        public IFormFile BinaryData { get; set; }
    }
}