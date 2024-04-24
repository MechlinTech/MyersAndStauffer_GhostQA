using Newtonsoft.Json;

namespace GhostQA_API.DTO_s
{
    public class Dto_TestSuites
    {
        [JsonProperty("TestSuiteName")]
        public string TestSuiteName { get; set; }
    }
}