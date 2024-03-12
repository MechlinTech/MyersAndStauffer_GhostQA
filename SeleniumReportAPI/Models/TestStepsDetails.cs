using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeleniumReportAPI.Models
{
    public class TestStepsDetails
    {
        [Key]
        public int TestStepsDetailsId { get; set; }
        public int TestCaseDetailsId { get; set; }
        public string Type { get; set; }
        public string StepDescription { get; set; }
        public string SelectorType { get; set; }
        public string SelectorValue { get; set; }
        public string ClickType { get; set; }
        public bool? IsOptional { get; set; }
        public string ElementSelector { get; set; }
        public string SelectedDragDroptype { get; set; }
        public string AssignInputValue { get; set; }
        public string KeyPressValue { get; set; }
        public string SelectedModifierKey { get; set; }
        public string ExecuteJavaScript { get; set; }
        public string PauseTime { get; set; }
        public string ExitTestStatus { get; set; }
        public string NavigateTo { get; set; }
        public string JavaScriptCode { get; set; }
        public string Accessibility { get; set; }
        public string AccessibilityModifier { get; set; }
        public string VariableName { get; set; }
        public string ExtractVariable { get; set; }
        public string JavascriptVariable { get; set; }
        public string ImportingStepFrom { get; set; }
        public string VariableInput { get; set; }
        public string extractJavaScript { get; set; }
    }
}