using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class SuiteScheduleInfo
    {
        [Key]
        public int Id { get; set; }
        public string RecurringInterval { get; set; }
        public string Interval { get; set; }
        public string SuiteName { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyOn { get; set; }
        public string CroneExpression { get; set; }
    }
}
