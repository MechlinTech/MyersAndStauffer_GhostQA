using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class FunctionalTestRun
    {
        [Key]
        public int Id { get; set; }
        public int RootId { get; set; }
        public string TestRunName { get; set; }
        public string TestRunDescription { get; set;}
        public string BuildVersion { get; set; }
        public string Environment { get; set; }
        public string Milestone { get; set; }
        public string AssignedTo { get; set; }
        public string TestCases { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }
}
