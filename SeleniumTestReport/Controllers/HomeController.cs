using SeleniumTestReport.DTO_s;
using SeleniumTestReport.Helper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;

namespace SeleniumTestReport.Controllers
{
    public class HomeController : Controller
    {
        private DBHelper dbHelper = new DBHelper();

        /// <summary>
        /// Get Test Suites Name on Page Load of Report to showcase in Report
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            ViewBag.TestSuites = dbHelper.GetDataTestSuits();
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
            string RunDetailsJson = dbHelper.GetRunDetails(testSuitName);
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
            string _TestRunDetails = dbHelper.GetTestCaseDetails(testSuitName, runId);
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
            string _TestCaseStepsDetails = dbHelper.GetTestCaseStepsDetails(testSuitName, runId, testCaseName);
            return PartialView("_TestCaseStepsDetails", _TestCaseStepsDetails);
        }

    }
}