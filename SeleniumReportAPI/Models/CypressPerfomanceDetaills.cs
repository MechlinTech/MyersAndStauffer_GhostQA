using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
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
        public string LoadDataJson { get; set; }
        public string TesterName { get; set; }
        public string Status { get; set; }
        public string LoactionDataJson { get; set; }
        public string TestDataJson { get; set; }
        public string PropertyDataJson { get; set; }
    }
}
