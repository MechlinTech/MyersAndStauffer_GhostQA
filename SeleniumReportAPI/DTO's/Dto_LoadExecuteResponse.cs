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
        public int TotalUser { get; set; }
        public List<Scenarios> Scenarios { get; set; }
        public int TotalDuration { get; set; }
        public int TotalRampUpSteps { get; set; }
        public int TotalRampUpTime { get; set; }
        public int maxDuration { get; set; }
    }

    public class Scenarios
    {
        public int Id { get; set; }
        public string ScenarioName { get; set; }
        public int Duration { get; set; }
        public string Location { get; set; }
    }
}
