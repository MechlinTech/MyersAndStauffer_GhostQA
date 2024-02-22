using Newtonsoft.Json;

namespace TestSeleniumReport.DTO_s
{
    public class Dto_TestSuites
    {
        [JsonProperty("TestSuiteName")]
        public string TestSuiteName { get; set; }
    }
}