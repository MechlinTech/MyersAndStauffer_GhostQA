using Newtonsoft.Json;

namespace SeleniumReportAPI.DTO_s
{
    public class Dto_TestSuites
    {
        [JsonProperty("TestSuiteName")]
        public string TestSuiteName { get; set; }
    }
}