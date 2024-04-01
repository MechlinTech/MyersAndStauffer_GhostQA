namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddTestStepsJson
    {
        public int testCaseID { get; set; }
        public List<ActionModel> actions { get; set; }
        public class ActionModel
        {
            public string action { get; set; }
            public string stepDescription { get; set; }
            public bool isOptional { get; set; }
            public string selectorType { get; set; }
            public string selectorValue { get; set; }
            public string sendKeyInput { get; set; }
            public string scrollPixel { get; set; }
            public string url { get; set; }
            public string selectedUser { get; set; }
            public string fileName { get; set; }
            public string elementValue { get; set; }
            public string cssValue { get; set; }
            public string cssProperty { get; set; }
            public string pageTitle { get; set; }
            public string currentUrl { get; set; }
            public string shouldNotEqualValue { get; set; }
            public string shouldIncludeValue { get; set; }
            public string shouldEqualValue { get; set; }
            public string shouldGreaterThanValue { get; set; }
            public string shouldLessValue { get; set; }
            public string containTextValue { get; set; }
            public string haveAttributeValue { get; set; }
        }
    }
}