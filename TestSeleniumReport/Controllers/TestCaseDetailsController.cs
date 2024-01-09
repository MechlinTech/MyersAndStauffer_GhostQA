using Microsoft.AspNetCore.Mvc;
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
            return View("Index", TestCasesListJson);
        }

    }
}
