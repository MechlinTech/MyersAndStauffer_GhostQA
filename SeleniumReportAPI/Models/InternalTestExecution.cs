﻿using System.ComponentModel.DataAnnotations.Schema;

namespace GhostQA_API.Models
{
    public class InternalTestExecution
    {
        [Column("TestSuite", TypeName = "VARCHAR(100)")]
        public string TestSuite { get; set; }
        [Column("TestCase", TypeName = "VARCHAR(100)")]
        public string TestCase { get; set; }
        [Column("TestCaseName", TypeName = "VARCHAR(100)")]
        public string TestRun { get; set; }
        [Column("Status", TypeName = "VARCHAR(10)")]
        public string Status { get; set; }
        [Column("StartDateTime", TypeName = "VARCHAR(50)")]
        public string StartDateTime { get; set; }
        [Column("EndDateTime", TypeName = "VARCHAR(50)")]
        public string EndDateTime { get; set; }
        public string SuiteDuration { get; set; }
        public string TestStepJson { get; set; }
        public string TestDuration { get; set; }
        public string TestScreenShotUrl { get; set; }
        public string TesterName { get; set; }
        public string TestVideoUrl { get; set; }
    }
}
