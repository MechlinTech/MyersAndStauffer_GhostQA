using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;
using NUnit.Framework;
using MyersAndStaufferSeleniumTests.Utils;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    [SetUpFixture]
    class SetupClass
    {
        public static ExtentTest test;
        public static ExtentReports extent;
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
