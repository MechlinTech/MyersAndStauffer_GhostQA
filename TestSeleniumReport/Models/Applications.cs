using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestSeleniumReport.Models
{
    public class Applications
    {
        [Key]
        public int ApplicationId { get; set; }

        [Required(ErrorMessage = "Application Name is required."), Column("ApplicationName", TypeName = "varchar(100)")]
        public string ApplicationName { get; set; }
    }
}