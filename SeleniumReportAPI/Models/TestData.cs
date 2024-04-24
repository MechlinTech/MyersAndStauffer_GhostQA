using System.ComponentModel.DataAnnotations;

namespace GhostQA_API.Models
{
    public class TestData
    {
        [Key]
        public int Id { get; set; }
        public int PerformanceFileId { get; set; }
        public string Name { get; set; }
        public string JsonData { get; set; }
        public string FilePath { get; set; }
    }
}
