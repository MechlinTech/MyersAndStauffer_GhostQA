using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeleniumReportAPI.Models
{
    public class RootRelation
    {
        [Key]
        public int RootId { get; set; }

        public int? Node { get; set; }

        public int? Parent { get; set; }
        public string Name { get; set; }
    }
}