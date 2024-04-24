using System.ComponentModel.DataAnnotations;

namespace GhostQA_API.Models
{
    public class PerformanceFile
    {
        [Key]
        public int Id { get; set; }
        public int RootId { get; set; }
        public string TestCaseName { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}