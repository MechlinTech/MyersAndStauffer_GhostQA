using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestSeleniumReport.DTO_s
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
    }
}
