using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;
using MyersAndStaufferFramework;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule;
using NUnit.Framework;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    [SetUpFixture]
    public class SetupClass
    {
        public static ExtentTest test;
        public static ExtentReports extent;
        public static TestData _testData = TestDataSharedInstance.testData;
        string reportPath;

        [OneTimeSetUp]
        public void Initialize()
        {
            string workingDirectory = Environment.CurrentDirectory;
            reportPath = workingDirectory + "//index.html";
            var htmlReporter = new ExtentHtmlReporter(reportPath);

            extent = new ExtentReports();
            extent.AttachReporter(htmlReporter);

            extent.AddSystemInfo("Tester Name", "Mukesh");
            extent.AddSystemInfo("Environment", "dev Environemnt");

            _testData.TesterName = TestExecutor.Testername;
            _testData.TestSuiteStartDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
        }

        [OneTimeTearDown]
        protected void TearDown()
        {
            extent.Flush();
            /*EmailService emailService = new EmailService();
            emailService.SendEmail(reportPath);*/
        }
    }
}
