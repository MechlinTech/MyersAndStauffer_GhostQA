using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using SeleniumTestReport.Helper;
using TestSeleniumReport.DTO_s;
using TestSeleniumReport.Models;

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
        public ActionResult GetDashboardDetails(string testSuitName)
        {
            string DashBoardDetailsJson = _helper.GetDashboardDetails(testSuitName);
            return PartialView("_Dashboard", DashBoardDetailsJson);
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

        /// <summary>
        /// Get All Value and Bind for initial Setup
        /// </summary>
        /// <returns></returns>
        public ActionResult AddTestSuite()
        {
            var ApplicationListJson = _helper.GetApplications();
            List<Models.Applications> _applicationList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Applications>>(ApplicationListJson);
            var EnvironmentListJson = _helper.GetEnvironments();
            List<Models.Environments> _environmentList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Environments>>(EnvironmentListJson);
            var _TestCasesListJson = _helper.GetTestCases();
            List<Dto_TestCase> _testCaseList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dto_TestCase>>(_TestCasesListJson);

            // Prepare data for dropdowns
            ViewBag.Applications = new SelectList(_applicationList, "ApplicationId", "ApplicationName");
            ViewBag.Environments = new SelectList(_environmentList, "EnvironmentId", "EnvironmentName");
            ViewBag.TestCases = new MultiSelectList(_testCaseList, "TestCaseName", "TestCaseName");

            return View();
        }

        /// <summary>
        /// Add or Update Test Suites on the basis of Test Suite Id
        /// </summary>
        /// <param name="model"></param>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddTestSuite(TestSuites model, string action)
        {
            Dto_Response _response = new Dto_Response();
            if (action == "Save")
            {
                string result = _helper.AddUpdateTestSuitesJson(model);
                _response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
            }
            else if (action == "SaveAndExecute")
            {
                string result = _helper.AddUpdateTestSuitesJson(model);
                _response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
                if (!_response.status.Contains("Fail"))
                {
                    foreach (var testCases in model.SelectedTestCases)
                    {
                        _helper.RunTestCase(testCases);
                    }
                }
            }
            if (!_response.status.Contains("Fail"))
            {
                //Logic to send Email
            }
            return View("Index");
        }

        /// <summary>
        /// Delete Test Suite but Test Suite Id
        /// </summary>
        /// <param name="TestSuiteId"></param>
        /// <returns></returns>
        public ActionResult DeleteTestSuites(int TestSuiteId)
        {
            try
            {
                string result = _helper.DeleteTestSuites(TestSuiteId);
                Dto_Response _Response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
                return RedirectToAction(_Response.message, "Index");
            }
            catch
            {
                throw;
            }
        }
    }
}