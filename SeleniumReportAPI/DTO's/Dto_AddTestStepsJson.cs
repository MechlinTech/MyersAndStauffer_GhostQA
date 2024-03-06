namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddTestStepsJson
    {
        public int testCaseID { get; set; }
        public List<ActionModel> actions { get; set; }
        public class ActionModel
        {
            public string type { get; set; }
            public string separator { get; set; }
        }
    }
}