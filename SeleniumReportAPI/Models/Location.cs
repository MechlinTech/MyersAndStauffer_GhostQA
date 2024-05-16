using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }
        public string CountryName { get; set; }
        public int LocationId { get; set; }
    }
}
