namespace SeleniumReportAPI.DTO_s
{
    public class Dto_LoadExecuteResponse
    {
        public string Client_Id { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int RootId { get; set; }
        public string TesterName { get; set; }
        public string Name { get; set; }
        public Dto_AddExecutePerformanceData responseData { get; set; }
    }
}
