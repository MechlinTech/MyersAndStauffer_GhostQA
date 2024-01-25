using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using SeleniumReportAPI.DTO_s;
using SeleniumReportAPI.Helper;
using SeleniumReportAPI.Models;
using TestSeleniumReport.DTO_s;

namespace SeleniumReportAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SeleniumController : ControllerBase
    {
        private readonly DBHelper _helper;
        public SeleniumController(DBHelper helper)
        {
            _helper = helper;
        }

        /// <summary>
        /// Get Test Suites Name on Page Load of Report to showcase in Report
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetDataTestSuits")]
        public ActionResult GetDataTestSuits()
        {
            return Ok(_helper.GetDataTestSuits());
        }

        /// <summary>
        /// Get Test Run Over All Details by TestSuite Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <returns></returns>
        [HttpGet("GetDashboardDetails")]
        public ActionResult GetDashboardDetails(string testSuitName)
        {
            return Ok(_helper.GetDashboardDetails(testSuitName));
        }

        /// <summary>
        /// Get Test Run Over All Details by TestSuite Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <returns></returns>
        [HttpGet("GetRunDetails")]
        public ActionResult GetRunDetails(string testSuitName)
        {
            return Ok(_helper.GetRunDetails(testSuitName));
        }

        /// <summary>
        /// Get Test Case Details By TestSuite and Test Run Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <param name="runId"></param>
        /// <returns></returns>
        [HttpGet("GetTestCaseDetails")]
        public ActionResult GetTestCaseDetails(string testSuitName, string runId)
        {
            return Ok(_helper.GetTestCaseDetails(testSuitName, runId));
        }

        /// <summary>
        /// Get Test Steps Details By TestSuite Name, Test Run Name and Test Case Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <param name="runId"></param>
        /// <param name="testCaseName"></param>
        /// <returns></returns>
        [HttpGet("GetTestCaseStepsDetails")]
        public ActionResult GetTestCaseStepsDetails(string testSuitName, string runId, string testCaseName)
        {
            return Ok(_helper.GetTestCaseStepsDetails(testSuitName, runId, testCaseName));
        }

        /// <summary>
        /// Add or Update Test Suites on the basis of Test Suite Id
        /// </summary>
        /// <param name="TestSuiteObject"></param>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost("AddUpdateTestSuites")]
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
                        string _testCaseJsonData = DBHelper.RunTestCase(testCaseName.ToString(), User.Identity.Name, _environmentDetails.Baseurl, _environmentDetails.BasePath, _environmentDetails.EnvironmentName, _environmentDetails.BrowserName, _environmentDetails.DriverPath);
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
            if (_response.status.Contains("fail"))
            {
                return StatusCode(409, _response);
            }
            return Ok(_response);
        }

        /// <summary>
        /// Get Application Data
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetApplication")]
        public ActionResult GetApplication()
        {
            return Ok(_helper.GetApplications());
        }

        /// <summary>
        /// Get Environment Data
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetEnvironments")]
        public ActionResult GetEnvironments()
        {
            return Ok(_helper.GetEnvironments());
        }

        /// <summary>
        /// Get Test Suites in Json Format
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetTestSuites")]
        public ActionResult GetTestSuites()
        {
            return Ok(_helper.GetTestSuitesJson());
        }

        /// <summary>
        /// Get Test Cases in Json Format
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetTestCases")]
        public ActionResult GetTestCases()
        {
            return Ok(_helper.GetTestCasesJson());
        }

        /// <summary>
        /// Delete Test Suite By Test Suite Name
        /// </summary>
        /// <param name="TestSuiteId"></param>
        /// <returns></returns>
        [HttpPost("DeleteTestSuites")]
        public ActionResult DeleteTestSuites(string TestSuiteName)
        {
            return Ok(_helper.DeleteTestSuites(TestSuiteName));
        }

        /// <summary>
        /// Get Test Suite Details in Json Format by Name
        /// </summary>
        /// <param name="TestSuiteName"></param>
        /// <returns></returns>
        [HttpGet("GetTestSuiteByName")]
        public ActionResult GetTestSuiteByName(string TestSuiteName)
        {
            return Ok(_helper.GetTestSuiteByName(TestSuiteName));
        }

        /// <summary>
        /// Execute a Test Suite by Test Suite Name
        /// </summary>
        /// <param name="TestSuiteName"></param>
        /// <returns></returns>
        //[HttpOptions("ExecuteTestSuite")]
        //public ActionResult ExecuteTestSuite(string TestSuiteName)
        //{
        //    string _testSuiteDetailsJson = _helper.GetTestSuiteByName(TestSuiteName);
        //    TestSuites _testSuiteDetails = Newtonsoft.Json.JsonConvert.DeserializeObject<TestSuites>(_testSuiteDetailsJson);
        //    if (_testSuiteDetails.SelectedTestCases.Count > 0)
        //    {
        //        foreach (var testCaseName in _testSuiteDetails.SelectedTestCases)
        //        {
        //            _helper.RunTestCase(testCaseName.ToString());
        //        }
        //    }
        //    return Ok();
        //}

        /// <summary>
        /// Add / Update Environments
        /// </summary>
        /// <param Environments=Environments></param>
        /// <returns></returns>
        [HttpPost("AddUpdateEnvironment")]
        public ActionResult AddUpdateEnvironment([FromBody] Models.Environments model)
        {

            try
            {
                var result = _helper.AddUpdateEnvironmentJson(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Add / Update Environments
        /// </summary>
        /// <param Applications=Applications></param>
        /// <returns></returns>
        [HttpPost("AddUpdateApplication")]
        public ActionResult AddUpdateApplication([FromBody] Models.Applications model)
        {

            try
            {
                var result = _helper.AddUpdateApplicationJson(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Add / Update Environments
        /// </summary>
        /// <param Browser=Browser></param>
        /// <returns></returns>
        [HttpPost("AddUpdateBrowser")]
        public ActionResult AddUpdateBrowser([FromBody] Models.Browsers model)
        {

            try
            {
                var result = _helper.AddUpdateBrowserJson(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get Browser in Json Format
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetBrowsers")]
        public ActionResult GetBrowsers()
        {
            return Ok(_helper.GetBrowsers());
        }

        /// <summary>
        /// Get Environment in Json Format by Id
        /// </summary>
        /// <param Id="Id"></param>
        /// <returns></returns>
        [HttpGet("GetEnvironmentById")]
        public ActionResult GetEnvironmentById(int Id)
        {
            return Ok(_helper.GetEnvironmentById(Id));
        }

        /// <summary>
        /// Execute Test Case
        /// </summary>
        /// <param TestCaseData=TestCaseData></param>
        /// <returns></returns>
        [HttpPost("SaveTestCaseData")]
        public ActionResult SaveTestCaseData(string testSuiteJsonData)
        {

            try
            {
                var result = _helper.SaveTestCaseData(testSuiteJsonData);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Get Test Suite Name
        /// </summary>
        /// <param Name="Name"></param>
        /// <returns></returns>
        [HttpGet("GetRunId")]
        public ActionResult GetRunId(string testSuiteName)
        {
            return Ok(_helper.GetRunId(testSuiteName));
        }
    }
}
