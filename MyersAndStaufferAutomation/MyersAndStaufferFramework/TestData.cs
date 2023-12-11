using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyersAndStaufferFramework
{
    public class TestData
    {
        public string Runid { get; set; }
        public string TesterName { get; set; }
        public string TesterEnvironment { get; set; }
        public string TestSuiteName { get; set; }
        public string TestCaseName { get; set; }
        public string TestCaseStatus { get; set; }
        public string FailureMessage { get; set; }
        public string FailureScreenshotPath { get; set; }
        public string StackTraceMessage { get; set; }
        public DateTime? Startdate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
