using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;
using NUnit.Framework;
using MyersAndStaufferSeleniumTests.Utils;
using MyersAndStaufferFramework;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    [SetUpFixture]
    public class SetupClass
    {
        public static ExtentTest test;
        public static ExtentReports extent;
        string reportPath;
        public static string RunId = "";

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
            RunId = DBConfiguration.GetRunId();
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
