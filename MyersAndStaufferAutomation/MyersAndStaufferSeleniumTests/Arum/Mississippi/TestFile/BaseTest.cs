using NUnit.Framework;
using NUnit.Framework.Interfaces;
using OpenQA.Selenium;
using MyersAndStaufferFramework;
using System.Text;
using AventStack.ExtentReports;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Data;
using MyersAndStaufferSeleniumTests.Utils;
using System.IO;
using System;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    [TestFixture]
    public class BaseTest : SetupClass
    {
        public static ExtentTest test;
        string reportPath;

        public Authentication Credentials = new Authentication();

        public IWebDriver driver;

        public EnvironmentHelper EnvironmentHelper { get; set; }

        private static string LoggingPath { get; set; }

        public bool IsQAA => EnvironmentHelper.Environment == "QA-Auto";

        public int EmailTimeoutInSeconds => EnvironmentHelper.SafeParse("EmailTimeoutInSeconds", 120);
        public static TestData testData;

        public BaseTest()
        {
            testData.TestCaseName = TestContext.CurrentContext.Test.Name;
            var testSuiteName = TestContext.CurrentContext.Test.ClassName.Replace(".", "/");
            testSuiteName = Directory.GetParent(testSuiteName).Parent.Parent.ToString();
            string[] directories = testSuiteName.Split("\\");
            testData.TestSuiteName = directories[directories.Length - 1];
            testData.TestRunName = DBConfiguration.GetRunId(testSuiteName);
            setLog_Data.SetDataMain(testData);
        }

        [SetUp]
        public void SetUp()
        {
            StringBuilder logMessage = new StringBuilder();
            test = SetupClass.extent.CreateTest(TestContext.CurrentContext.Test.Name);

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

            string baseURL = EnvironmentHelper.GetSetting("BaseURL");
            bool isRunningHeadless = bool.Parse(EnvironmentHelper.GetSetting("RunTestHeadless"));
            logMessage.Append($"[BaseURL={baseURL}][IsRunningHeadless={isRunningHeadless.ToString()}]");

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

            Browser.Start(BrowserDriver.Chrome, isRunHeadless: isRunningHeadless, windowSize: browserWindowSize);
            driver = Browser.Driver;
            driver.Manage().Window.Maximize();
        }

        [TearDown]
        public virtual void TearDown()
        {
            var status = TestContext.CurrentContext.Result.Outcome.Status;
            var message = TestContext.CurrentContext.Result.Message;
            var stackTrace = TestContext.CurrentContext.Result.StackTrace;
            testData.TestCaseStatus = status.ToString();
            testData.TestFailureMessage = message;
            setLog_Data.SetDataMain(testData);

            DateTime time = DateTime.Now;
            string fileName2 = "Screenshot_" + time.ToString("h_mm_ss") + ".png";

            if (status == TestStatus.Failed)
            {
                test.Fail("Test Failed and here is the screenshot on which test failed", captureScreenShot(driver, fileName2));
                test.Log(Status.Fail, "Test failed with message " + message);
                test.Log(Status.Fail, "Test failed with logTrace " + stackTrace);
            }
            else if (status == TestStatus.Passed)
            {
                test.Pass("Test Passed");
            }

            if (TestContext.CurrentContext.Result.Outcome != ResultState.Success)
            {
                ScreenShot("Failure", true);
                AttatchLogToTest();
            }
            Browser.Driver.Dispose();
            testData = setLog_Data.GetData();
            DBConfiguration.SaveTestCaseData(testData);
        }

        public static void ScreenShot(string fileName = null, bool hasTimeStamp = false)
        {
            fileName ??= TestContext.CurrentContext.Test.MethodName;
            Screenshot ss = ((ITakesScreenshot)Browser.Driver).GetScreenshot();
            string timestamp = DateTime.Now.ToString("yy-MM-dd hh-mm-ss");
            string screenshotFile = Path.Combine(TestContext.CurrentContext.WorkDirectory, fileName + (hasTimeStamp ? timestamp : null) + ".png");
            ss.SaveAsFile(screenshotFile, ScreenshotImageFormat.Png);
            TestContext.AddTestAttachment(screenshotFile, fileName + "Screenshot");
            WriteToLogfile("Error screenshot: " + screenshotFile);

            testData.TestFailureScreenShot = screenshotFile;
            setLog_Data.SetDataMain(testData);
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
                string fileName = "Diagnostic_Logs_" + TestName + guid;
                LoggingPath = Path.Combine(TestContext.CurrentContext.WorkDirectory, fileName + ".txt");
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
