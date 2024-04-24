namespace GhostQA_API.DTO_s
{
    public class Dto_LoadBinaryResponse
    {
        public string Client_Id { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int RootId { get; set; }
        public string TesterName { get; set; }
        public string Name { get; set; }
        public byte[] responseData { get; set; }
        public int TotalUser { get; set; }
        public string scenarios { get; set; }
        public int TotalDuration { get; set; }
        public int TotalRampUpSteps { get; set; }
        public int TotalRampUpTime { get; set; }
        public int maxDuration { get; set; }
    }
}
