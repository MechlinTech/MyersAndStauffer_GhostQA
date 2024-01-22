using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestPlatform.ObjectModel;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Pages;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule;
using MyersAndStaufferSeleniumTests.Utils;
using SeleniumTestReport.Helper;

namespace TestSeleniumReport.Controllers
{
    public class TestCaseDetailsController : Controller
    {
        public readonly LoginTest mLoginTest;
        public static string browsername = "Chrome";
        public static string EnvironmentName = "dev";
        public static string baseurl = "https://clocksession.com/";
        public static string basePath = "C:\\Users\\Nitin\\Source\\Repos\\MyersAndStauffer_GhostQA1\\TestSeleniumReport\\wwwroot\\";
        public static string driverPath = "C:\\Users\\Nitin\\source\\repos\\MyersAndStauffer_GhostQA1\\MyersAndStauffer_GhostQA1\\MyersAndStaufferAutomation\\MyersAndStaufferSeleniumTests\\bin\\x64\\Debug\\net6.0";
        //public static string basePath = @"D:\MechlinTech\MyersAndStauffer_GhostQA\TestSeleniumReport\wwwroot\\";
        //public static string driverPath = @"D:\MechlinTech\MyersAndStauffer_GhostQA\MyersAndStaufferAutomation\MyersAndStaufferSeleniumTests\bin\x64\Debug\net6.0";
        public static string testerName = "GhostQA";



        //public enum EnvironmentName
        //{
        //    QA,
        //    UAT,
        //    Staging,
        //    Dev,
        //    Prod
        //}
        private readonly DBHelper _helper;
        public TestCaseDetailsController(DBHelper helper)
        {
            _helper = helper;
        }

        /// <summary>
        /// Load Index Page with Test case details
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            string TestCasesListJson = _helper.GetTestCases();
            RunTestCase("VerifyLoginOK2");
            return View("Index", TestCasesListJson);
        }

        public static void RunTestCase(string testCaseName)
        {

            //testCaseName = new LoginTest().getcurrentTestName();
            // var testExecutor = new TestExecutor();
            //var method = testExecutor.GetType().GetMethod(string.Concat("Run", testCaseName));

            //if (method != null)
            //{
            //   method.Invoke(testExecutor, null);
            //}
            //else
            //{
            // //Handle the case where the method with the provided name is not found
            //    Console.WriteLine($"Method '{testCaseName}' not found.");
            //}
            //string result = TestExecutor.RunVerifyLoginOK(BrowserDriver.Chrome, EnvironmentName.UAT.ToString(), testCaseName);

            string result = TestExecutor.ExecuteTestCases(browsername, EnvironmentName, testCaseName, baseurl, basePath, driverPath, testerName);
        }
    }
}