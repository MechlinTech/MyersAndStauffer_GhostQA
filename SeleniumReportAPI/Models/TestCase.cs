using System.ComponentModel.DataAnnotations.Schema;

namespace GhostQA_API.Models
{
    public class TestCase
    {
        [Column("TestSuiteName", TypeName = "VARCHAR(100)")]
        public string TestSuiteName { get; set; }
        [Column("TestRunName", TypeName = "VARCHAR(100)")]
        public string TestRunName { get; set; }
        [Column("TestCaseName", TypeName = "VARCHAR(100)")]
        public string? TestCaseName { get; set; }
        [Column("TestCaseStatus", TypeName = "VARCHAR(10)")]
        public string? TestCaseStatus { get; set; }
        [Column("TestCaseVideoURL", TypeName = "NVARCHAR(1000)")]
        public string? TestCaseVideoURL { get; set; }
        [Column("TestSuiteStartDateTime", TypeName = "VARCHAR(50)")]
        public string? TestSuiteStartDateTime { get; set; }
        [Column("TestSuiteEndDateTime", TypeName = "VARCHAR(50)")]
        public string? TestSuiteEndDateTime { get; set; }
        [Column("TestRunStartDateTime", TypeName = "VARCHAR(50)")]
        public string? TestRunStartDateTime { get; set; }
        [Column("TestRunEndDateTime", TypeName = "VARCHAR(50)")]
        public string? TestRunEndDateTime { get; set; }
        public string? TestCaseSteps { get; set; }
        [Column("TesterName", TypeName = "VARCHAR(100)")]
        public string? TesterName { get; set; }
        [Column("TestEnvironment", TypeName = "VARCHAR(100)")]
        public string? TestEnvironment { get; set; }
    }
}
