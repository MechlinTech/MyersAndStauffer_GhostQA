using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestSeleniumReport.Models
{
    public class TestSuites
    {
        [Key]
        public int TestSuiteId { get; set; }
        [Required, Column("TestSuiteName", TypeName = "varchar(100)")]
        public string TestSuiteName { get; set; }
    }
}
