namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddTestStepsJson
    {
        public int testCaseID { get; set; }
        public List<ActionModel> actions { get; set; }
        public class ActionModel
        {
            public string description { get; set; }
            public string actionName { get; set; }
            public string selectorType { get; set; }
            public string selectorValue { get; set; }
            public string text { get; set; }
            public string isOption { get; set; }
        }
    }
}