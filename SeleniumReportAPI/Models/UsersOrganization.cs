using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class UsersOrganization
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string LogoPath { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
    }
}
