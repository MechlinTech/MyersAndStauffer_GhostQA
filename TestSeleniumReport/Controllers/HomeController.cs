using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using SeleniumTestReport.Helper;
using TestSeleniumReport.DTO_s;

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
        public ActionResult GetDashboardDetails(string TestSuiteName, string Filtertype, int FilterValue)
        {
            string DashBoardDetailsJson = _helper.GetDashboardDetails(TestSuiteName, Filtertype, FilterValue);
            ViewBag.TestSuites = TestSuiteName;
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
        public ActionResult AddTestSuite(Dto_TestSuiteDetailsData model, string action)
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
                    string _testRunName = _helper.GetRunId(model.TestSuiteName);
                    Models.Environments _environmentDetails = _helper.GetEnvironmentById(Convert.ToInt32(model.EnvironmentId));
                    foreach (var testCaseName in model.SelectedTestCases)
                    {
                        string _testCaseJsonData = _helper.RunTestCase(testCaseName.ToString(), User.Identity.Name, _environmentDetails.Baseurl, _environmentDetails.BasePath, _environmentDetails.EnvironmentName, _environmentDetails.BrowserName, _environmentDetails.DriverPath);
                        if (!string.IsNullOrEmpty(_testCaseJsonData))
                        {
                            Dto_TestCaseData _testSuiteData = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_TestCaseData>(_testCaseJsonData);
                            _testSuiteData.TestSuiteName = model.TestSuiteName;
                            _testSuiteData.TesterName = User.Identity.Name;
                            _testSuiteData.TestRunName = _testRunName;
                            _testSuiteData.TestEnvironment = _environmentDetails.BrowserName;
                            //Save Data into table for custom test suite
                            string _result = _helper.SaveTestCaseData(Newtonsoft.Json.JsonConvert.SerializeObject(_testSuiteData));
                        }
                    }
                }
            }
            if (!_response.status.Contains("Fail"))
            {
                //Logic to send Email
            }
            return RedirectToAction("Index");
        }

        /// <summary>
        /// Delete Test Suite but Test Suite Id
        /// </summary>
        /// <param name="TestSuiteId"></param>
        /// <returns></returns>
        public ActionResult DeleteTestSuites(string TestSuiteName)
        {
            try
            {
                string result = _helper.DeleteTestSuites(TestSuiteName);
                Dto_Response _Response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
            }
            catch
            {
                throw;
            }
            return RedirectToAction("Index");
        }

        /// <summary>
        /// Edit a Test Suite by Test Suite Name
        /// </summary>
        /// <param name="testSuiteName"></param>
        /// <returns></returns>
        public ActionResult EditTestSuite(string testSuiteName)
        {
            if (string.IsNullOrEmpty(testSuiteName))
            {
                return View("Index");
            }
            Dto_TestSuiteDetailsData result = _helper.GetTestSuiteByName(testSuiteName);

            var ApplicationListJson = _helper.GetApplications();
            List<Models.Applications> _applicationList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Applications>>(ApplicationListJson);
            var EnvironmentListJson = _helper.GetEnvironments();
            List<Models.Environments> _environmentList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Environments>>(EnvironmentListJson);
            var _TestCasesListJson = _helper.GetTestCases();
            List<Dto_TestCase> _testCaseList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dto_TestCase>>(_TestCasesListJson);
            result.AllTestCases = _testCaseList.Select(value => new SelectListItem { Text = value.TestCaseName, Value = value.TestCaseName, Selected = result.SelectedTestCases.Contains(value.TestCaseName) }).ToList();
            // Prepare data for dropdowns
            ViewBag.Applications = new SelectList(_applicationList, "ApplicationId", "ApplicationName");
            ViewBag.Environments = new SelectList(_environmentList, "EnvironmentId", "EnvironmentName");
            ViewBag.TestCases = new MultiSelectList(_testCaseList, "TestCaseName", "TestCaseName");

            return View(result);
        }

        /// <summary>
        /// Execute a Test Suite by Test Suite Name
        /// </summary>
        /// <param name="TestSuiteName"></param>
        /// <returns></returns>
        public ActionResult ExecuteTestSuite(string TestSuiteName)
        {
            string _testRunName = _helper.GetRunId(TestSuiteName);
            Dto_TestSuiteDetailsData _testSuiteDetails = _helper.GetTestSuiteByName(TestSuiteName);
            Models.Environments _environmentDetails = _helper.GetEnvironmentById(Convert.ToInt32(_testSuiteDetails.EnvironmentId));

            if (_testSuiteDetails.SelectedTestCases.Count > 0)
            {
                foreach (var testCaseName in _testSuiteDetails.SelectedTestCases)
                {
                    string _testCaseJsonData = _helper.RunTestCase(testCaseName.ToString(), User.Identity.Name, _environmentDetails.Baseurl, _environmentDetails.BasePath, _environmentDetails.EnvironmentName, _environmentDetails.BrowserName, _environmentDetails.DriverPath);
                    if (!string.IsNullOrEmpty(_testCaseJsonData))
                    {
                        Dto_TestCaseData _testSuiteData = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_TestCaseData>(_testCaseJsonData);
                        _testSuiteData.TestSuiteName = TestSuiteName;
                        _testSuiteData.TesterName = User.Identity.Name;
                        _testSuiteData.TestRunName = _testRunName;
                        _testSuiteData.TestEnvironment = _environmentDetails.BrowserName;
                        _testSuiteData.TestCaseName = testCaseName.ToString();
                        //Save Data into table for custom test suite
                        string _result = _helper.SaveTestCaseData(Newtonsoft.Json.JsonConvert.SerializeObject(_testSuiteData));
                    }
                }
            }
            return RedirectToAction("Index");
        }
    }
}