using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SeleniumReportAPI.DTO_s;
using SeleniumReportAPI.Helper;
using System.Security.Claims;
using TestSeleniumReport.DTO_s;

namespace SeleniumReportAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
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
        public async Task<ActionResult> GetDataTestSuits()
        {
            return Ok(await _helper.GetDataTestSuits());
        }

        /// <summary>
        /// Get Test Run Over All Details by TestSuite Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <returns></returns>
        [HttpGet("GetDashboardDetails")]
        public async Task<ActionResult> GetDashboardDetails(string testSuitName)
        {
            return Ok(await _helper.GetDashboardDetails(testSuitName));
        }

        /// <summary>
        /// Get Test Run Over All Details by TestSuite Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <returns></returns>
        [HttpGet("GetRunDetails")]
        public async Task<ActionResult> GetRunDetails(string testSuitName)
        {
            return Ok(await _helper.GetRunDetails(testSuitName));
        }

        /// <summary>
        /// Get Test Case Details By TestSuite and Test Run Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <param name="runId"></param>
        /// <returns></returns>
        [HttpGet("GetTestCaseDetails")]
        public async Task<ActionResult> GetTestCaseDetails(string testSuitName, string runId)
        {
            return Ok(await _helper.GetTestCaseDetails(testSuitName, runId));
        }

        /// <summary>
        /// Get Test Steps Details By TestSuite Name, Test Run Name and Test Case Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <param name="runId"></param>
        /// <param name="testCaseName"></param>
        /// <returns></returns>
        [HttpGet("GetTestCaseStepsDetails")]
        public async Task<ActionResult> GetTestCaseStepsDetails(string testSuitName, string runId, string testCaseName)
        {
            return Ok(await _helper.GetTestCaseStepsDetails(testSuitName, runId, testCaseName));
        }

        /// <summary>
        /// Add or Update Test Suites on the basis of Test Suite Id
        /// </summary>
        /// <param name="TestSuiteObject"></param>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost("AddUpdateTestSuites")]
        public async Task<ActionResult> AddTestSuite(Dto_TestSuiteDetailsData model, string action)
        {
            Dto_Response _response = new Dto_Response();
            if (action == "Save")
            {
                string result = await _helper.AddUpdateTestSuitesJson(model);
                _response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
            }
            else if (action == "SaveAndExecute")
            {
                string? testerName = User.FindFirst(ClaimTypes.Email)?.Value.ToString();
                string result = await _helper.AddUpdateTestSuitesJson(model);
                _response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
                if (!_response.status.Contains("Fail"))
                {
                    string _testRunName = await _helper.GetRunId(model.TestSuiteName);
                    Models.Environments _environmentDetails = await _helper.GetEnvironmentById(Convert.ToInt32(model.EnvironmentId));
                    foreach (var testCaseName in model.SelectedTestCases)
                    {
                        string _testCaseJsonData = await _helper.RunTestCase(model.TestSuiteName.ToString(), testCaseName.ToString(), _testRunName, testerName, _environmentDetails.Baseurl, _environmentDetails.BasePath, _environmentDetails.EnvironmentName, _environmentDetails.BrowserName, _environmentDetails.DriverPath);
                        if (!string.IsNullOrEmpty(_testCaseJsonData))
                        {
                            Dto_TestCaseData _testSuiteData = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_TestCaseData>(_testCaseJsonData);
                            _testSuiteData.TestSuiteName = model.TestSuiteName;
                            _testSuiteData.TesterName = testerName;
                            _testSuiteData.TestRunName = _testRunName;
                            _testSuiteData.TestEnvironment = _environmentDetails.BrowserName;
                            //Save Data into table for custom test suite
                            string _result = await _helper.SaveTestCaseData(Newtonsoft.Json.JsonConvert.SerializeObject(_testSuiteData));
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
        public async Task<ActionResult> GetApplication()
        {
            return Ok(await _helper.GetApplications());
        }

        /// <summary>
        /// Get Environment Data
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetEnvironments")]
        public async Task<ActionResult> GetEnvironments()
        {
            return Ok(await _helper.GetEnvironments());
        }

        /// <summary>
        /// Get Test Suites in Json Format
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetTestSuites")]
        public async Task<ActionResult> GetTestSuites()
        {
            return Ok(await _helper.GetTestSuitesJson());
        }

        /// <summary>
        /// Get Test Cases in Json Format
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetTestCases")]
        public async Task<ActionResult> GetTestCases()
        {
            return Ok(await _helper.GetTestCasesJson());
        }

        /// <summary>
        /// Delete Test Suite By Test Suite Name
        /// </summary>
        /// <param name="TestSuiteId"></param>
        /// <returns></returns>
        [HttpPost("DeleteTestSuites")]
        public async Task<ActionResult> DeleteTestSuites(string TestSuiteName)
        {
            return Ok(await _helper.DeleteTestSuites(TestSuiteName));
        }

        /// <summary>
        /// Get Test Suite Details in Json Format by Name
        /// </summary>
        /// <param name="TestSuiteName"></param>
        /// <returns></returns>
        [HttpGet("GetTestSuiteByName")]
        public async Task<ActionResult> GetTestSuiteByName(string TestSuiteName)
        {
            return Ok(await _helper.GetTestSuiteByName(TestSuiteName));
        }

        /// <summary>
        /// Execute a Test Suite by Test Suite Name
        /// </summary>
        /// <param name="TestSuiteName"></param>
        /// <returns></returns>
        [HttpOptions("ExecuteTestSuite")]
        public async Task<ActionResult> ExecuteTestSuite(string TestSuiteName)
        {
            string _result = string.Empty;
            string _testRunName = await _helper.GetRunId(TestSuiteName);
            string _testSuiteDetailsJson = await _helper.GetTestSuiteByName(TestSuiteName);
            string? testerName = User.FindFirst(ClaimTypes.Email)?.Value.ToString();
            Dto_TestSuiteDetailsData _testSuiteDetails = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_TestSuiteDetailsData>(_testSuiteDetailsJson);

            Models.Environments _environmentDetails = await _helper.GetEnvironmentById(Convert.ToInt32(_testSuiteDetails.EnvironmentId));

            if (_testSuiteDetails.SelectedTestCases.Count > 0)
            {
                foreach (var testCaseName in _testSuiteDetails.SelectedTestCases)
                {
                    string _testCaseJsonData = await _helper.RunTestCase(TestSuiteName, testCaseName.ToString(), _testRunName, testerName, _environmentDetails.Baseurl, _environmentDetails.BasePath, _environmentDetails.EnvironmentName, _environmentDetails.BrowserName, _environmentDetails.DriverPath);
                    if (!string.IsNullOrEmpty(_testCaseJsonData))
                    {
                        try
                        {
                            Dto_TestCaseData _testSuiteData = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_TestCaseData>(_testCaseJsonData);
                            _testSuiteData.TestSuiteName = TestSuiteName;
                            _testSuiteData.TesterName = testerName;
                            _testSuiteData.TestRunName = _testRunName;
                            _testSuiteData.TestEnvironment = _environmentDetails.BrowserName;
                            _testSuiteData.TestCaseName = testCaseName.ToString();
                            //Save Data into table for custom test suite
                            _result = await _helper.SaveTestCaseData(Newtonsoft.Json.JsonConvert.SerializeObject(_testSuiteData));
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                    }
                }
            }
            return Ok(_result);
        }

        /// <summary>
        /// Add / Update Environments
        /// </summary>
        /// <param Environments=Environments></param>
        /// <returns></returns>
        [HttpPost("AddUpdateEnvironment")]
        public async Task<ActionResult> AddUpdateEnvironment([FromBody] Models.Environments model)
        {
            try
            {
                var result = await _helper.AddUpdateEnvironmentJson(model);
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
        public async Task<ActionResult> AddUpdateApplication([FromBody] Models.Applications model)
        {
            try
            {
                var result = await _helper.AddUpdateApplicationJson(model);
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
        public async Task<ActionResult> AddUpdateBrowser([FromBody] Models.Browsers model)
        {
            try
            {
                var result = await _helper.AddUpdateBrowserJson(model);
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
        public async Task<ActionResult> GetBrowsers()
        {
            return Ok(await _helper.GetBrowsers());
        }

        /// <summary>
        /// Get Environment in Json Format by Id
        /// </summary>
        /// <param Id="Id"></param>
        /// <returns></returns>
        [HttpGet("GetEnvironmentById")]
        public async Task<ActionResult> GetEnvironmentById(int Id)
        {
            return Ok(await _helper.GetEnvironmentById(Id));
        }

        /// <summary>
        /// Execute Test Case
        /// </summary>
        /// <param TestCaseData=TestCaseData></param>
        /// <returns></returns>
        [HttpPost("SaveTestCaseData")]
        public async Task<ActionResult> SaveTestCaseData(string testSuiteJsonData)
        {
            try
            {
                var result = await _helper.SaveTestCaseData(testSuiteJsonData);
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
        public async Task<ActionResult> GetRunId(string testSuiteName)
        {
            return Ok(await _helper.GetRunId(testSuiteName));
        }

        /// <summary>
        /// Get Test Run Over All Details by TestSuite Name
        /// </summary>
        /// <param name="testSuitName"></param>
        /// <returns></returns>
        [HttpGet("GetChartDetails")]
        public async Task<ActionResult> GetDashboardDetails(string TestSuiteName, string Filtertype, int FilterValue)
        {
            try
            {
                string result = await _helper.GetDashboardDetails(TestSuiteName, Filtertype, FilterValue);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        /// <summary>
        /// Delete Application By ApplicationId
        /// </summary>
        /// <param Int="ApplicationId"></param>
        /// <returns></returns>
        [HttpPost("DeleteApplication")]
        public async Task<ActionResult> DeleteApplication(int ApplicationId)
        {
            return Ok(await _helper.DeleteApplication(ApplicationId));
        }

        /// <summary>
        /// Delete Browser By BrowserId
        /// </summary>
        /// <param Int="BrowserId"></param>
        /// <returns></returns>
        [HttpPost("DeleteBrowser")]
        public async Task<ActionResult> DeleteBrowser(int BrowserId)
        {
            return Ok(await _helper.DeleteBrowser(BrowserId));
        }

        /// <summary>
        /// Delete Environment By EnvironmentId
        /// </summary>
        /// <param Int="EnvironmentId"></param>
        /// <returns></returns>
        [HttpPost("DeleteEnvironment")]
        public async Task<ActionResult> DeleteEnvironment(int EnvironmentId)
        {
            return Ok(await _helper.DeleteEnvironment(EnvironmentId));
        }

        /// <summary>
        /// Check Test Execution is in progress or not
        /// </summary>
        /// <returns></returns>
        [HttpGet("IsExecutionInProgress")]
        public async Task<ActionResult> IsExecutionInProgress()
        {
            return Ok(await _helper.GetExecutionInProgress());
        }
    }
}