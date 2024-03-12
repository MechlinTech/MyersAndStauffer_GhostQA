namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddTestStepsJson
    {
        public int testCaseID { get; set; }
        public List<ActionModel> actions { get; set; }
        public class ActionModel
        {
            public string type { get; set; }
            public string stepDescription { get; set; }
            public bool isOptional { get; set; }
            public string selectorType { get; set; }
            public string selectorValue { get; set; }
            public string clickType { get; set; }
            public string elementSelector { get; set; }
            public string selectedDragDropType { get; set; }
            public string assignInputValue { get; set; }
            public string keyPressValue { get; set; }
            public string selectedModifierKey { get; set; }
            public string executeJavaScript { get; set; }
            public string pauseTime { get; set; }
            public string exitTestStatus { get; set; }
            public string navigateTo { get; set; }
            public string javaScriptCode { get; set; }
            public string accessibility { get; set; }
            public string accessibilityModifier { get; set; }
            public string variableName { get; set; }
            public string extractVariable { get; set; }
            public string javaScriptVariable { get; set; }
            public string importingStepFrom { get; set; }
            public string variableInput { get; set; }
            public string extractJavaScript { get; set; }
        }
    }
}