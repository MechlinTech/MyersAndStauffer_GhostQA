using System.ComponentModel.DataAnnotations;

namespace GhostQA_API.Models
{
    public class CypressPerfomanceDetaills
    {
        [Key]
        public int Id { get; set; }
        public int RootId { get; set; }
        public string Name { get; set; }
        public string RunId { get; set; }
        public string StartDateTime { get; set; }
        public string EndDateTime { get; set; }
        public byte[] LoadDataJson { get; set; }
        public string TesterName { get; set; }
        public string Status { get; set; }
        public string LoactionDataJson { get; set; }
        public string TestDataJson { get; set; }
        public string PropertyDataJson { get; set; }
        public int TotalUser { get; set; }
        public string Scenarios { get; set; }
        public int TotalDuration { get; set; }
        public int TotalRampUpSteps { get; set; }
        public int TotalRampUpTime { get; set; }
        public int MaxDuration { get; set; }
    }
}
