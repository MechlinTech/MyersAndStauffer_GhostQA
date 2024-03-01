using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeleniumReportAPI.Models
{
    public class TestStepsDetails
    {
        [Key]
        public int TestStepsDetailsId { get; set; }

        public int TestCaseDetailsId { get; set; }

        [Required(ErrorMessage = "Test Steps Name is required."), Column("TestStepsName", TypeName = "varchar(100)")]
        public string TestStepsName { get; set; }

        [Required(ErrorMessage = "Action Name is required."), Column("ActionName", TypeName = "varchar(100)")]
        public string ActionName { get; set; }
    }
}