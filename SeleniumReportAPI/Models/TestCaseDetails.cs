using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GhostQA_API.Models
{
    public class TestCaseDetails
    {
        [Key]
        public int TestCaseDetailsId { get; set; }
        public int RootId { get; set; }

        [Required(ErrorMessage = "TestCaseName Name is required."), Column("TestCaseName", TypeName = "varchar(100)")]
        public string TestCaseName { get; set; }

        [Required(ErrorMessage = "StartUrl Name is required."), Column("StartUrl", TypeName = "varchar(100)")]
        public string StartUrl { get; set; }
    }
}