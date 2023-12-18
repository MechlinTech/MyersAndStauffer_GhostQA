using MyersAndStaufferFramework;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.Data
{
    public class SetLog_data
    {
        private static TestData _testData;

        public void SetDataMain(TestData testData)
        {
            if (_testData == null)
            {
                _testData = new TestData();
            }
            _testData.TestSuiteName = testData.TestSuiteName;
            _testData.TestRunName = testData.TestRunName;
            _testData.TestCaseName = testData.TestCaseName;
            _testData.TestCaseStatus = testData.TestCaseStatus;
            _testData.TestFailureMessage = testData.TestFailureMessage;
            _testData.TestFailureScreenShot = testData.TestFailureScreenShot;
            _testData.TestRunStartDateTime = testData.TestRunStartDateTime;
            _testData.TestRunEndDateTime = testData.TestRunEndDateTime;
            _testData.TestEnvironment = testData.TestEnvironment;
            _testData.TesterName = testData.TesterName;
        }

        public void SetDataSteps(string testSteps)
        {
            _testData.TestCaseSteps = testSteps;
        }

        public TestData GetData()
        {
            return _testData;
        }

        public class TestStepColumns
        {
            public string Status { get; set; }
            public DateTime Timestamp { get; set; }
            public string Details { get; set; }
        }
    }
}
