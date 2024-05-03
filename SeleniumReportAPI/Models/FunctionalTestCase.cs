using System.ComponentModel.DataAnnotations;
namespace SeleniumReportAPI.Models
{
    public class FunctionalTestCase
    {
        [Key]
        public int Id { get; set; }
        public int RootId { get; set; }
        public string TestCaseName { get; set; }
        public string Status { get; set; }
        public string PreCondition { get; set; }
        public string Steps { get; set; }
        public string ExpectedResult { get; set; }
        public string ActualResult { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set;}
        public string UpdatedOn { get; set;}

    }
}
