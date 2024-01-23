using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestSeleniumReport.Models
{
    public class TestSuites
    {
        [Key]
        public int TestSuiteId { get; set; }

        [Required(ErrorMessage = "Test Suite Name is required."), Column("TestSuiteName", TypeName = "varchar(100)")]
        public string TestSuiteName { get; set; }
        public string Description { get; set; }
        public string TestSuiteType { get; set; } // "BuiltIn" or "Custom"

        [Required(ErrorMessage = "Application is required.")]
        public int ApplicationId { get; set; }
        public bool SendEmail { get; set; }

        [Required(ErrorMessage = "Environment is required.")]
        public int EnvironmentId { get; set; }
        public string SelectedTestCases { get; set; }
    }
}
