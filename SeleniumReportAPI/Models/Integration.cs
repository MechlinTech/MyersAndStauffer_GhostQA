using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class Integration
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string AppName { get; set; }
        public bool IsIntegrated { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }

    }
}
