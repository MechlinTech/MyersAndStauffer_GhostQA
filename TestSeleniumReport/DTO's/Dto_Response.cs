using Newtonsoft.Json;

namespace TestSeleniumReport.DTO_s
{
    public class Dto_Response
    {
        [JsonProperty("status")]
        public string? status { get; set; }

        [JsonProperty("message")]
        public string? message { get; set; }
    }
}