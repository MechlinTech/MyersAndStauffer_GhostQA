using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SeleniumReportAPI.DTO_s
{
    public class TestStep
    {
        public string title { get; set; }
        public string fullTitle { get; set; }
        public object timedOut { get; set; }
        public int duration { get; set; }
        public string state { get; set; }
        public string speed { get; set; }
        public bool pass { get; set; }
        public bool fail { get; set; }
        public bool pending { get; set; }
        public object context { get; set; }
        public string code { get; set; }
        public object err { get; set; }
        public string uuid { get; set; }
        public string parentUUID { get; set; }
        public bool isHook { get; set; }
        public bool skipped { get; set; }
    }

    public class TestSuite
    {
        public string uuid { get; set; }
        public string title { get; set; }
        public string fullFile { get; set; }
        public string file { get; set; }
        public List<object> beforeHooks { get; set; }
        public List<object> afterHooks { get; set; }
        public List<TestStep> tests { get; set; }
        public List<TestSuite> suites { get; set; }
        public List<string> passes { get; set; }
        public List<object> failures { get; set; }
        public List<object> pending { get; set; }
        public List<object> skipped { get; set; }
        public int duration { get; set; }
        public bool root { get; set; }
        public bool rootEmpty { get; set; }
        public int _timeout { get; set; }
    }

    public class Stats
    {
        public int suites { get; set; }
        public int tests { get; set; }
        public int passes { get; set; }
        public int pending { get; set; }
        public int failures { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
        public int duration { get; set; }
        public int testsRegistered { get; set; }
        public int passPercent { get; set; }
        public int pendingPercent { get; set; }
        public int other { get; set; }
        public bool hasOther { get; set; }
        public int skipped { get; set; }
        public bool hasSkipped { get; set; }
    }

    public class Dto_RootObject
    {
        public string container_id { get; set; }
        public List<RunArtifactOption> runs_artifacts { get; set; }
        public object json { get; set; }
    }

    public class RunArtifactOption
    {
        public int id { get; set; }
        public string type { get; set; }
        public string files { get; set; }
        public int container_runs { get; set; }
        public int suite { get; set; }
    }

    //public class JsonData
    //{
    //    public JObject Test { get; set; }
    //}
    public class JsonOption
    {
        public Stats stats { get; set; }
        public List<TestSuite> results { get; set; }
    }
}
