using System.ComponentModel.DataAnnotations;

namespace SeleniumReportAPI.Models
{
    public class ProjectRootRelation
    {
        [Key]
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
    }

}