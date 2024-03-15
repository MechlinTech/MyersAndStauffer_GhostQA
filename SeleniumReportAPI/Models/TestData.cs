using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class TestData
    {
        [Key]
        public int Id { get; set; }
        public int PerformanceFileId { get; set; }
        public string Name { get; set; }
        public string JsonData { get; set; }
    }
}
