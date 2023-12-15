using SeleniumTestReport.DTO_s;
using SeleniumTestReport.Helper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;

namespace SeleniumTestReport.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            DBHelper dbHelper = new DBHelper();
            DataTable TestSuits = dbHelper.GetDataTestSuits();
            ViewBag.TestSuites = dbHelper.GetListFromDataTable(TestSuits);
            return View();
        }

        public ActionResult GetTestDetails(string testSuitName, string runId)
        {
            DBHelper dbHelper = new DBHelper();
            DataTable TestDetails = dbHelper.GetRunIdDetails(testSuitName, runId);
            List<Dto_TestRunDetails> _TestRunDetails = dbHelper.GetTestRunListFromDataTable(TestDetails);
            return View(_TestRunDetails);
        }

        [HttpGet]
        public ActionResult GetTestRunIDs(string testSuitName)
        {
            DBHelper dbHelper = new DBHelper();
            DataTable TestRunIDs = dbHelper.GetDataRunIDs(testSuitName);
            List<Dto_RunId> _RunIds = dbHelper.GetModelListFromDataTable(TestRunIDs);
            ViewBag.RunDates = _RunIds.Select(x => x.RunDateTime).Distinct().ToList();
            return PartialView("_RunIds", _RunIds);
        }

        [HttpGet]
        public ActionResult GetTestCaseDetails(string testSuitName, string runId)
        {
            DBHelper dbHelper = new DBHelper();
            DataTable TestRunDetails = dbHelper.GetRunIdDetails(testSuitName, runId);
            List<Dto_TestRunDetails> _TestRunDetails = dbHelper.GetTestRunListFromDataTable(TestRunDetails);
            DataTable TestDetails = dbHelper.GetTestCaseDetails(testSuitName, runId);
            Dto_TestDetails _TestDetails = dbHelper.GetDetailsListFromDataTable(TestDetails);
            ViewBag.PassedCase = _TestDetails.PassedTestCases;
            ViewBag.FailedCase = _TestDetails.FailedTestCases;
            ViewBag.PageTitle = string.Concat(testSuitName, ">", runId, ">");
            return PartialView("_TestDetails", _TestRunDetails);
        }
    }
}