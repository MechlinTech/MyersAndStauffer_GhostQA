using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class ExistingSuiteRun
    {
        [Key]
        public int Id { get; set; }
        public bool IsExistingSuiteRunning { get; set; }
    }
}
