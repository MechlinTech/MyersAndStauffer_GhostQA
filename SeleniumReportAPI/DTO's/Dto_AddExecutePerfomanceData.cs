using Newtonsoft.Json;

namespace GhostQA_API.DTO_s
{
    public class Dto_AddExecutePerformanceData
    {
        public int count { get; set; }
        public string next { get; set; }
        public string previous { get; set; }
        public List<Result> results { get; set; }
    }

    public class Result
    {
        public int id { get; set; }
        public string container_id { get; set; }
        public string container_status { get; set; }
        public string test_file { get; set; }
        public string container_labels { get; set; }
        public string container_name { get; set; }
        public string container_short_id { get; set; }

        [JsonProperty("ref")]
        public string reference { get; set; }
        public List<RunArtifacts> runs_artifacts { get; set; }
        public Json json { get; set; }
        public int suite { get; set; }
        public List<PerformanceData> raw_data { get; set; }
        public string client_reference_id { get; set; }
        public List<SuccessGroupData> success_group_data { get; set; }
        public List<ErrorGroupData> error_group_data { get; set; }
    }

    public class RunArtifacts
    {
        public int id { get; set; }
        public string type { get; set; }
        public string files { get; set; }
        public int container_runs { get; set; }
        public int suite { get; set; }
    }

    public class PerformanceData
    {
        public long timeStamp { get; set; }
        public int elapsed { get; set; }
        public string label { get; set; }
        public int responseCode { get; set; }
        public string responseMessage { get; set; }
        public string threadName { get; set; }
        public string dataType { get; set; }
        public bool success { get; set; }
        public object failureMessage { get; set; }
        public int bytes { get; set; }
        public int sentBytes { get; set; }
        public int grpThreads { get; set; }
        public int allThreads { get; set; }
        public string URL { get; set; }
        public int Latency { get; set; }
        public int IdleTime { get; set; }
        public int Connect { get; set; }
    }

    public class SuccessGroupData
    {
        public int code { get; set; }
        public string description { get; set; }
        public int count { get; set; }
    }

    public class ErrorGroupData { }

    public class Json
    {
        public JsonProps home_page { get; set; }
        public JsonProps Total { get; set; }
    }

    public class JsonProps
    {
        public string transaction { get; set; }
        public int sampleCount { get; set; }
        public int errorCount { get; set; }
        public double errorPct { get; set; }
        public double meanResTime { get; set; }
        public double medianResTime { get; set; }
        public double minResTime { get; set; }
        public double maxResTime { get; set; }
        public double pct1ResTime { get; set; }
        public double pct2ResTime { get; set; }
        public double pct3ResTime { get; set; }
        public double throughput { get; set; }
        public double receivedKBytesPerSec { get; set; }
        public double sentKBytesPerSec { get; set; }
    }
}