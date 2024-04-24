using System.ComponentModel.DataAnnotations;

namespace GhostQA_API.Models
{
    public class TestStepsDetails
    {
        [Key]
        public int TestStepsDetailsId { get; set; }
        public int TestCaseDetailsId { get; set; }
        public string Action { get; set; }
        public string StepDescription { get; set; }
        public bool? IsOptional { get; set; }
        public string SelectorType { get; set; }
        public string SelectorValue { get; set; }
        public string SendKeyInput { get; set; }
        public string ScrollPixel { get; set; }
        public string Url { get; set; }
        public string SelectedUser { get; set; }
        public string FileName { get; set; }
        public string ElementValue { get; set; }
        public string CssValue { get; set; }
        public string CssProperty { get; set; }
        public string PageTitle { get; set; }
        public string CurrentUrl { get; set; }
        public string ShouldNotEqualValue { get; set; }
        public string ShouldIncludeValue { get; set; }
        public string ShouldEqualValue { get; set; }
        public string ShouldGreaterThanValue { get; set; }
        public string ShouldLessValue { get; set; }
        public string ContainTextValue { get; set; }
        public string HaveAttributeValue { get; set; }
        public string TextValue { get; set; }
    }
}