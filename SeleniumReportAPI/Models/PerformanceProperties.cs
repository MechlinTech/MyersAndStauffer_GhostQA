using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class PerformanceProperties
    {
        [Key]
        public int Id { get; set; }
        public int PerformanceFileId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}