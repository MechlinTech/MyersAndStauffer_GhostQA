using System.ComponentModel.DataAnnotations;

namespace GhostQA_API.Models
{
    public class FuncationalTest
    {
        [Key]
        public int RootId { get; set; }
        public int? Node { get; set; }
        public int? Parent { get; set; }
        public string Name { get; set; }
    }
}
