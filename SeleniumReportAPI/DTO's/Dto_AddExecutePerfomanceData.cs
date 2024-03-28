namespace SeleniumReportAPI.DTO_s
{
    public class Dto_AddExecutePerformanceData
    {
        public List<Result> results { get; set; }
    }

    public class Result
    {
        public Json json { get; set; }
    }

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