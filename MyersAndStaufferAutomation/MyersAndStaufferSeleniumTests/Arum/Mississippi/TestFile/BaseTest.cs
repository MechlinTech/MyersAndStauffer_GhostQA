using AventStack.ExtentReports;
using MyersAndStaufferFramework;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Data;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule;
using MyersAndStaufferSeleniumTests.Utils;
using Newtonsoft.Json;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using OpenQA.Selenium;
using System.Text;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    [TestFixture]
    public class BaseTest
    {
        public static string basePath = TestExecutor.Basepath;
        public static string EnvironmentName = TestExecutor.environmentName;
        public Authentication Credentials = new Authentication();
        public IWebDriver driver;
        private static string LoggingPath { get; set; }
        public static TestData _testData = TestDataSharedInstance.testData;
        public static List<TestStepColumns> _testSteps = TestCaseStepsInstance.TestSteps;

        public BaseTest()
        {
            _testData.TestSuiteStartDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestEnvironment = EnvironmentName;
        }

        [SetUp]
        public void SetUp()
        {
            try
            {
                StringBuilder logMessage = new StringBuilder();
                _testData.TestCaseName = TestContext.CurrentContext.Test.Name;
                //Get Browser settings
                string baseURL = TestExecutor.Baseurl;
                WindowSize browserWindowSize = new WindowSize(1280, 720);
                LogMessage(logMessage.ToString());
                Browser.Start(BrowserDriver.Chrome, windowSize: browserWindowSize, isRunHeadless: true);
                driver = Browser.Driver;
                driver.Manage().Window.Maximize();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [TearDown]
        public virtual void TearDown()
        {
            var status = LoginTest.Status;
            var message = LoginTest.Message;
            var stackTrace = LoginTest.StackTrace;

            DateTime time = DateTime.Now;
            string fileName2 = "Screenshot_" + time.ToString("h_mm_ss") + ".png";

            if (status == TestStatus.Failed.ToString())
            {
                _testSteps.Add(new TestStepColumns { Status = "Failed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), FailureException = "Test failed with logTrace " + stackTrace.ToString() });
            }
            else if (status == TestStatus.Passed.ToString())
            {
                _testSteps.Add(new TestStepColumns { Status = "Failed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Test Passed" });
            }

            if (status == TestStatus.Failed.ToString())
            {
                ScreenShot(message.ToString(), "Failure", true);
                AttatchLogToTest();
            }

            _testData.TestRunEndDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestCaseSteps = "-";
            //VideoRecorder.EndRecording();

            Browser.Driver.Dispose();
            _testData.TestSuiteEndDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestCaseSteps = JsonConvert.SerializeObject(_testSteps.Where(x => x.Timestamp is not null && (x.Status is not null || x.Status != string.Empty)));
            TestExecutor.JsonData = JsonConvert.SerializeObject(_testData);
            // This is required to execute test cases very first time
            //DBConfiguration.SaveTestCaseData(JsonConvert.SerializeObject(_testData));
            //DBConfiguration.UpdateTestStepsJson(JsonConvert.SerializeObject(_testSteps.Where(x => x.Timestamp is not null && (x.Status is not null || x.Status != string.Empty))), _testData.TestSuiteName, _testData.TestRunName, _testData.TestCaseName);
        }

        public static void ScreenShot(string FailureMessage, string fileName = null, bool hasTimeStamp = false)
        {
            fileName ??= _testData.TestCaseName.ToString();
            Screenshot ss = ((ITakesScreenshot)Browser.Driver).GetScreenshot();
            string timestamp = DateTime.Now.ToString("yy-MM-dd hh-mm-ss");

            string screenshotFile = Path.Combine(basePath, fileName + (hasTimeStamp ? timestamp : null) + ".png");
            ss.SaveAsFile(screenshotFile);
            TestContext.AddTestAttachment(screenshotFile, fileName + "Screenshot");
            WriteToLogfile("Error screenshot: " + screenshotFile);

            var FailureSSPath = Path.Combine(basePath, "FailureScreenShots", DateTime.Now.ToString("MMMM_dd_yyyy"));
            if (!Directory.Exists(FailureSSPath))
            {
                Directory.CreateDirectory(FailureSSPath);
            }
            var FailureSSImagePath = Path.Combine(FailureSSPath, fileName + (hasTimeStamp ? timestamp : null) + ".png");
            ss.SaveAsFile(FailureSSImagePath);
            _testSteps.Add(new TestStepColumns { Status = "Failed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Test Failed and here is the screenshot on which test failed", FailureMessage = "Test failed with message " + FailureMessage.ToString().Replace("'", "''"), FailureScreenShots = FailureSSImagePath.StartsWith(basePath) ? @"\" + FailureSSImagePath.Substring(basePath.Length).ToString() : FailureSSImagePath.ToString() });
        }

        // Helper Methods

        /// <summary>
        /// Checks if the partial URL path is contained in the current URL
        /// </summary>
        /// <param name="partialUrl"></param>
        /// <returns></returns>
        public bool IsPathInCurrentUrl(string partialUrl)
        {
            return Browser.Driver.Url.ToLower()
                .Contains(partialUrl.ToLower());
        }

        public MediaEntityModelProvider captureScreenShot(IWebDriver driver, string screenShotName)
        {
            ITakesScreenshot ts = (ITakesScreenshot)driver;
            var screenshot = ts.GetScreenshot().AsBase64EncodedString;

            return MediaEntityBuilder.CreateScreenCaptureFromBase64String(screenshot, screenShotName).Build();
        }

        public static void WriteToLogfile(string logInstanceMessage = "", string TestName = "")
        {
            if (string.IsNullOrEmpty(LoggingPath))
            {
                string guid = Guid.NewGuid().ToString();
                string fileName = "Diagnostic_Logs_" + _testData.TestCaseName.ToString() + guid;
                LoggingPath = Path.Combine(basePath, fileName + ".txt");
            }
            if (File.Exists(LoggingPath))
            {
                File.AppendAllText(LoggingPath, logInstanceMessage + Environment.NewLine);
            }
            else
            {
                File.WriteAllText(LoggingPath, logInstanceMessage + Environment.NewLine);
            }
        }

        public static void AttatchLogToTest()
        {
            if (File.Exists(LoggingPath))
            {
                TestContext.AddTestAttachment(LoggingPath);
                TestContext.Write("Test Failed on the this URL " + Browser.Driver.Url);
            }
        }

        public static void LogMessage(string message) => WebDriverExtensions.LogMessage(message);
    }
}