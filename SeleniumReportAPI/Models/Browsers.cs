using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeleniumReportAPI.Models
{
    public class Browsers
    {
        [Key]
        public int BrowserId { get; set; }

        [Required(ErrorMessage = "Browser Name is required."), Column("BrowserName", TypeName = "varchar(100)")]
        public string BrowserName { get; set; }
    }
}