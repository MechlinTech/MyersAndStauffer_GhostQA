using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SeleniumTestReport.DTO_s
{
    public class dto_TestDetails
    {
        public int TotalTestCases { get; set; }
        public int PassedTestCases { get; set; }
        public int FailedTestCases { get; set; }
    }
}