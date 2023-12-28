using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SeleniumTestReport.DTO_s
{
    public class Dto_TestSuites
    {
        [JsonProperty("TestSuiteName")]
        public string TestSuiteName { get; set; }
    }
}