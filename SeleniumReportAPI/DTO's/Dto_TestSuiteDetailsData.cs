using Microsoft.AspNetCore.Mvc.Rendering;

namespace GhostQA_API.DTO_s
{
    public class Dto_TestSuiteDetailsData
    {
        public int TestSuiteId { get; set; }
        public string TestSuiteName { get; set; }
        public string TestSuiteType { get; set; }
        public int ApplicationId { get; set; }
        public bool SendEmail { get; set; }
        public int EnvironmentId { get; set; }
        public List<string> SelectedTestCases { get; set; }
        public List<SelectListItem> AllTestCases { get; set; }
        public string Description { get; set; }
    }
}