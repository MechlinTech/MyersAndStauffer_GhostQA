using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeleniumTestReport.Helper;

namespace TestSeleniumReport.Controllers
{
    public class HomeController : Controller
    {
        private readonly DBHelper _helper;
        public HomeController(DBHelper helper)
        {
            _helper = helper;
        }

        /// <summary>
        /// Get Test Suites Name on Page Load of Report to showcase in Report
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public ActionResult Index()
        {
            ViewBag.TestSuites = _helper.GetDataTestSuits();
            return View();
        }

        /// <summary>
        /// Get Test Run Over All Details by TestSuite Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetRunDetails(string testSuitName)
        {
            string RunDetailsJson = _helper.GetRunDetails(testSuitName);
            return PartialView("_RunDetails", RunDetailsJson);
        }

        /// <summary>
        /// Get Test Case Details By TestSuite and Test Run Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <param name="runId"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetTestCaseDetails(string testSuitName, string runId)
        {
            string _TestRunDetails = _helper.GetTestCaseDetails(testSuitName, runId);
            return PartialView("_TestDetails", _TestRunDetails);
        }

        /// <summary>
        /// Get Test Steps Details By TestSuite Name, Test Run Name and Test Case Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <param name="runId"></param>
        /// <param name="testCaseName"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetTestCaseStepsDetails(string testSuitName, string runId, string testCaseName)
        {
            string _TestCaseStepsDetails = _helper.GetTestCaseStepsDetails(testSuitName, runId, testCaseName);
            return PartialView("_TestCaseStepsDetails", _TestCaseStepsDetails);
        }

    }
}