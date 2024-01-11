using Microsoft.AspNetCore.Mvc;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule;
using SeleniumTestReport.Helper;

namespace TestSeleniumReport.Controllers
{
    public class TestCaseDetailsController : Controller
    {
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

        public void RunTestCase(string testCaseName)
        {
            var testExecutor = new TestExecutor();
            var method = testExecutor.GetType().GetMethod(string.Concat("Run", testCaseName));

            if (method != null)
            {
                method.Invoke(testExecutor, null);
            }
            else
            {
                // Handle the case where the method with the provided name is not found
                Console.WriteLine($"Method '{testCaseName}' not found.");
            }
        }
    }
}
