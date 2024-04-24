using System.ComponentModel.DataAnnotations;

namespace GhostQA_API.Models
{
    public class CypressDetails
    {
        [Key]
        public int Id { get; set; }
        public string TestSuite { get; set; }
        public string TestCaseId { get; set; }
        public int TestCaseDetailsId { get; set; }
        public string TestCaseName { get; set; }
        public string Status { get; set; }
        public string StartDateTime { get; set; }
        public string EndDateTime { get; set; }
        public string SuiteDuration { get; set; }
        public string TestStepJson { get; set; }
        public string TestDuration { get; set; }
        public string TestScreenShotUrl { get; set; }
        public string TesterName { get; set; }
        public string TestVideoUrl { get; set; }
        public byte[] ContainerLog { get; set; }
    }
}
