using Newtonsoft.Json;
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
            var result = TestSuits.AsEnumerable().Select(x => x.ItemArray[0]).ToList();
            ViewBag.Result = result;
            return View();
        }

        public JsonResult GetTestRunIDs(string testSuitName)
        {
            DBHelper dbHelper = new DBHelper();
            DataTable TestRunIDs = dbHelper.GetDataRunIDs(testSuitName);
            var result = JsonConvert.SerializeObject(TestRunIDs);
            return Json(result);
        }

        public DataTable GetTestCaseDetails(string testSuitName, string runId)
        {
            DBHelper dbHelper = new DBHelper();
            DataTable TestRunIDs = dbHelper.GetTestCaseDetails(testSuitName, runId);
            return TestRunIDs;
        }
    }
}