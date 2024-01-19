using Microsoft.AspNetCore.Mvc;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule;
using MyersAndStaufferSeleniumTests.Utils;
using SeleniumTestReport.Helper;

namespace TestSeleniumReport.Controllers
{
    public class TestCaseDetailsController : Controller
    {
        public readonly LoginTest mLoginTest;
        private string mtestname;

        public enum browser
        {
            Chrome,
            Edge,
            Firefox,
            Safari
        }
        public enum EnvironmentName
        {
            QA,
            UAT,
            Staging,
            Dev,
            Prod
        }
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
            RunTestCase("VerifyLoginOK");
            return View("Index", TestCasesListJson);
        }

        public static void RunTestCase(string testCaseName)
        {

            //testCaseName = new LoginTest().getcurrentTestName();
            /* var testExecutor = new TestExecutor();
            var method = testExecutor.GetType().GetMethod(string.Concat("Run", testCaseName));

            if (method != null)
            {
               method.Invoke(testExecutor, null);
            }
            else
            {
             //Handle the case where the method with the provided name is not found
                Console.WriteLine($"Method '{testCaseName}' not found.");
            }*/
            string result = TestExecutor.RunVerifyLoginOK(BrowserDriver.Chrome, EnvironmentName.UAT.ToString(), testCaseName);
        }
    }
}