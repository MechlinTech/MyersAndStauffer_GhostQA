using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(200)]
        public string FullName { get; set; }
        [MaxLength(100)]
        public string OrganizationName { get; set; }
        public bool IsDisabled { get; set; }
    }
}