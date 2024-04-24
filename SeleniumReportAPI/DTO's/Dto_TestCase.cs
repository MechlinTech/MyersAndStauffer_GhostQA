using Newtonsoft.Json;

namespace GhostQA_API.DTO_s
{
    public class Dto_TestCase
    {
        [JsonProperty("TestCaseName")]
        public string TestCaseName { get; set; }
    }
}