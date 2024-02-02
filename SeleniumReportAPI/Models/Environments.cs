using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeleniumReportAPI.Models
{
    public class Environments
    {
        [Key]
        public int EnvironmentId { get; set; }

        [Required(ErrorMessage = "Environment Name is required."), Column("EnvironmentName", TypeName = "varchar(100)")]
        public string EnvironmentName { get; set; }

        public int ApplicationId { get; set; }

        [Required(ErrorMessage = "Baseurl is required."), Column("Baseurl", TypeName = "varchar(100)")]
        public string Baseurl { get; set; }

        [Required(ErrorMessage = "BasePath is required."), Column("BasePath", TypeName = "varchar(100)")]
        public string BasePath { get; set; }

        [Required(ErrorMessage = "DriverPath  is required."), Column("DriverPath", TypeName = "varchar(100)")]
        public string DriverPath { get; set; }

        public int BroswerId { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }

        [NotMapped]
        public string ApplicationName { get; set; }

        [NotMapped]
        public string BrowserName { get; set; }
        public string? Description { get; set; }
    }
}