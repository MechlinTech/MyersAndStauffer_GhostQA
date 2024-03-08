using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeleniumReportAPI.Models
{
    public class TestStepsDetails
    {
        [Key]
        public int TestStepsDetailsId { get; set; }
        public int TestCaseDetailsId { get; set; }
        public string Description { get; set; }
        public string ActionName { get; set; }
        public string SelectorType { get; set; }
        public string SelectorValue { get; set; }
        public string Text { get; set; }
        public string IsOption { get; set; }

    }
}