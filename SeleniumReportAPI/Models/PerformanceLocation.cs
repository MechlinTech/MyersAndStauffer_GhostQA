using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class PerformanceLocation
    {
        [Key]
        public int Id { get; set; }
        public int PerformanceFileId { get; set; }
        public string Name { get; set; }
        public int NumberUser { get; set; }
        public decimal PercentageTraffic { get; set;}
    }
}