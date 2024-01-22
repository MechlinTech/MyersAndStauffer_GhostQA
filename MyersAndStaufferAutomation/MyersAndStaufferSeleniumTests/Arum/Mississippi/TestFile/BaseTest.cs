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
    public class BaseTest : SetupClass
    {
        public static ExtentTest test;
        string reportPath;
        //public static string basePath = DBConfiguration.GetDBConnectionString("AppSettings:basePath");
        public static string basePath = TestExecutor.Basepath;
        public static string EnvironmentName = TestExecutor.environmentName;

        public static string mainPath = Directory.GetCurrentDirectory();

        public Authentication Credentials = new Authentication();

        public IWebDriver driver;

        public EnvironmentHelper EnvironmentHelper { get; set; }

        private static string LoggingPath { get; set; }

        public bool IsQAA => EnvironmentHelper.Environment == "QA-Auto";

        public int EmailTimeoutInSeconds => EnvironmentHelper.SafeParse("EmailTimeoutInSeconds", 120);
        public static TestData _testData = TestDataSharedInstance.testData;
        public static List<TestStepColumns> _testSteps = TestCaseStepsInstance.TestSteps;

        public BaseTest()
        {
            //var testSuiteName = TestContext.CurrentContext.Test.ClassName.Replace(".", "/");
            //testSuiteName = Directory.GetParent(testSuiteName).Parent.Parent.ToString();
            //string[] directories = testSuiteName.Split("\\");
            //_testData.TestSuiteName = directories[directories.Length - 1];
            // _testData.TestRunName = DBConfiguration.GetRunId(_testData.TestSuiteName);
            //_testData.TestEnvironment = EnvironmentName;
        }

        [SetUp]
        public void SetUp()
        {
            StringBuilder logMessage = new StringBuilder();
            test = SetupClass.extent.CreateTest(TestContext.CurrentContext.Test.Name);
            _testData.TestCaseName = TestContext.CurrentContext.Test.Name;


            // Load runtime configuration settings
            string configName = string.Empty;
            if (File.Exists(Path.Join(AppDomain.CurrentDomain.BaseDirectory, EnvironmentConfigUtils.ConfigNameFile)))
            {
                // Read the running config name from file env.config created on the PostBuild task
                configName = File.ReadAllText(Path.Join(AppDomain.CurrentDomain.BaseDirectory, EnvironmentConfigUtils.ConfigNameFile)).Trim();
            }
            logMessage.Append($"[Configuration={configName}]");

            // Get Browser settings
            EnvironmentHelper = EnvironmentConfigUtils.GetEnvironmentForConfig();

            // string baseURL = EnvironmentHelper.GetSetting("BaseURL");
            string baseURL = TestExecutor.Baseurl;
            //bool isRunningHeadless = bool.Parse(EnvironmentHelper.GetSetting("RunTestHeadless"));
            //logMessage.Append($"[BaseURL={baseURL}][IsRunningHeadless={isRunningHeadless.ToString()}]");

            WindowSize browserWindowSize = new WindowSize(1280, 720);
            string browserWidthSetting = EnvironmentHelper.GetSetting("BrowserWidth");
            string browserHeightSetting = EnvironmentHelper.GetSetting("BrowserHeight");

            if (!string.IsNullOrEmpty(browserHeightSetting) && !string.IsNullOrEmpty(browserWidthSetting))
            {
                int height = int.Parse(browserHeightSetting);
                int width = int.Parse(browserWidthSetting);
                browserWindowSize = new WindowSize(width, height);
                logMessage.Append($"[BrowserResolution={width}x{height}]");

            }
            LogMessage(logMessage.ToString());

            Browser.Start(BrowserDriver.Chrome, windowSize: browserWindowSize);
            driver = Browser.Driver;
            driver.Manage().Window.Maximize();
        }

        [TearDown]
        public virtual void TearDown()
        {
            //var status = TestContext.CurrentContext.Result.Outcome.Status;
            //var message = TestContext.CurrentContext.Result.Message;
            //var stackTrace = TestContext.CurrentContext.Result.StackTrace;
            var status = LoginTest.Status;
            var message = LoginTest.Message;
            var stackTrace = LoginTest.StackTrace;
            //_testData.TestCaseStatus = status.ToString();

            DateTime time = DateTime.Now;
            string fileName2 = "Screenshot_" + time.ToString("h_mm_ss") + ".png";

            if (status == TestStatus.Failed.ToString())
            {
                //test.Fail("Test Failed and here is the screenshot on which test failed", captureScreenShot(driver, fileName2));
               // test.Log(Status.Fail, "Test failed with message " + message);
               // test.Log(Status.Fail, "Test failed with logTrace " + stackTrace);

                _testSteps.Add(new TestStepColumns { Status = "Failed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Test Failed and here is the screenshot on which test failed" });

                _testSteps.Add(new TestStepColumns { Status = "Failed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), FailureException = "Test failed with logTrace " + stackTrace.ToString() });
            }
            else if (status == TestStatus.Passed.ToString())
            {
                test.Pass("Test Passed");
                test.Log(Status.Pass, "Test failed with message " + message);
                test.Log(Status.Pass, "Test failed with logTrace " + stackTrace);
            }

            //if (TestContext.CurrentContext.Result.Outcome == ResultState.Failure)
            if (status == TestStatus.Failed.ToString())
            {
                ScreenShot(message.ToString(), "Failure", true);
                AttatchLogToTest();
            }

            _testData.TestRunEndDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestCaseSteps = "-";
            VideoRecorder.EndRecording();

            Browser.Driver.Dispose();
            _testData.TestSuiteEndDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestCaseSteps = JsonConvert.SerializeObject(_testSteps.Where(x => x.Timestamp is not null && (x.Status is not null || x.Status != string.Empty)));
            TestExecutor.JsonData = JsonConvert.SerializeObject(_testData);
           //DBConfiguration.SaveTestCaseData(JsonConvert.SerializeObject(_testData));
           //DBConfiguration.UpdateTestStepsJson(JsonConvert.SerializeObject(_testSteps.Where(x => x.Timestamp is not null && (x.Status is not null || x.Status != string.Empty))), _testData.TestSuiteName, _testData.TestRunName, _testData.TestCaseName);
        }

        public static void ScreenShot(string FailureMessage, string fileName = null, bool hasTimeStamp = false)
        {
            fileName ??= _testData.TestCaseName.ToString();
            Screenshot ss = ((ITakesScreenshot)Browser.Driver).GetScreenshot();
            string timestamp = DateTime.Now.ToString("yy-MM-dd hh-mm-ss");

            string screenshotFile = Path.Combine(basePath, fileName + (hasTimeStamp ? timestamp : null) + ".png");
            ss.SaveAsFile(screenshotFile, ScreenshotImageFormat.Png);
            TestContext.AddTestAttachment(screenshotFile, fileName + "Screenshot");
            WriteToLogfile("Error screenshot: " + screenshotFile);



            var FailureSSPath = Path.Combine(basePath, "FailureScreenShots", DateTime.Now.ToString("MMMM_dd_yyyy"));
            if (!Directory.Exists(FailureSSPath))
            {
                Directory.CreateDirectory(FailureSSPath);
            }
            var FailureSSImagePath = Path.Combine(FailureSSPath, fileName + (hasTimeStamp ? timestamp : null) + ".png");
            ss.SaveAsFile(FailureSSImagePath, ScreenshotImageFormat.Png);
            _testSteps.Add(new TestStepColumns { Status = "Failed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), FailureMessage = "Test failed with message " + FailureMessage.ToString().Replace("'", "''"), FailureScreenShots = FailureSSImagePath.StartsWith(basePath) ? @"\\" + FailureSSImagePath.Substring(basePath.Length).ToString() : FailureSSImagePath.ToString() });
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
