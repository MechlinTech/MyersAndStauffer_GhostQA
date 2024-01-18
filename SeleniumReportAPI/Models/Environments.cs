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
    }
}
