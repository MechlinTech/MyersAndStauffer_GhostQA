using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class FunctionalSuiteRelation
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Parent { get; set; }
    }
}
