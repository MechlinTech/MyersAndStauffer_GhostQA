using System.ComponentModel.DataAnnotations;

namespace GhostQA_API.Models
{
    public class PerformanceLocation
    {
        [Key]
        public int Id { get; set; }
        public int PerformanceFileId { get; set; }
        public string Name { get; set; }
        public int NumberUser { get; set; }
        public decimal PercentageTraffic { get; set; }
    }
}