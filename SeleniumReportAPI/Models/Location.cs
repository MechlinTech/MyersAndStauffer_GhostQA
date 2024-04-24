using System.ComponentModel.DataAnnotations;

namespace GhostQA_API.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }
        public string CountryName { get; set; }
    }
}
