using Newtonsoft.Json;

namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddPrivateLocation
    {
        public List<Location> results { get; set; }

        public class Location
        {
            public int id { get; set; }
            [JsonProperty("ref")]
            public string reference { get; set; }
            public string location_name { get; set; }
            public int parallel_engine_runs { get; set; }
            public string functionality { get; set; }
            public string location_type { get; set; }
            public int max_threads_per_engine { get; set; }
            public int console_xms_mb { get; set; }
            public int console_xmx_mb { get; set; }
            public string created_at { get; set; }
            public string updated_at { get; set; }
        }
    }
}
