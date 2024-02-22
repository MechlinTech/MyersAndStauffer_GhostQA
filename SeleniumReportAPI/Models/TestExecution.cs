using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class TestExecution
    {
        [Key]
        public int ExecutionId { get; set; }
        public string TestSuiteName { get; set; }
        public string TestRunName { get; set; }
        public string TestCaseName { get; set; }
        public string TestEnvironment { get; set; }
        public string TesterName { get; set; }
        public DateTime ExecutionStartTime { get; set; }
        public bool IsExecutionInProgress { get; set; }
    }
}
