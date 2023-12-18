using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;
using NUnit.Framework;
using MyersAndStaufferSeleniumTests.Utils;
using MyersAndStaufferFramework;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Data;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    [SetUpFixture]
    public class SetupClass
    {
        public static ExtentTest test;
        public static ExtentReports extent;
        public static SetLog_data setLog_Data = new SetLog_data();

        string reportPath;

        [OneTimeSetUp]
        protected void Initialize()
        {
            string workingDirectory = Environment.CurrentDirectory;
            reportPath = workingDirectory + "//index.html";
            var htmlReporter = new ExtentHtmlReporter(reportPath);

            extent = new ExtentReports();
            extent.AttachReporter(htmlReporter);

            extent.AddSystemInfo("Tester Name", "Mukesh");
            extent.AddSystemInfo("Environment", "dev Environemnt");

            TestData testData = new TestData();
            testData.TesterName = "Mukesh";
            testData.TestEnvironment = "dev Environment";
            setLog_Data.SetDataMain(testData);
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
