﻿using Newtonsoft.Json;

namespace SeleniumReportAPI.DTO_s
{
    public class Dto_TestCaseSelection
    {
        [JsonProperty("TestCaseName")]
        public string TestCaseName { get; set; }
        [JsonProperty("IsSelected")]
        public bool IsSelected { get; set; }
    }
}
