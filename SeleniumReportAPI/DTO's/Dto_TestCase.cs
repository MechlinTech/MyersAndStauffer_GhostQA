using Newtonsoft.Json;

namespace SeleniumReportAPI.DTO_s
{
    public class Dto_TestCase
    {
        [JsonProperty("TestCaseName")]
        public string TestCaseName { get; set; }
    }
}
