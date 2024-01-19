using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using SeleniumReportAPI.DTO_s;
using SeleniumReportAPI.Helper;
using SeleniumReportAPI.Models;

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
        public ActionResult AddUpdateTestSuites(TestSuites TestSuiteObject, string action)
        {
            Dto_Response _response = new Dto_Response();
            if (action == "Save")
            {
                string result = _helper.AddUpdateTestSuitesJson(TestSuiteObject);
                _response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
            }
            else if (action == "SaveAndExecute")
            {
                string result = _helper.AddUpdateTestSuitesJson(TestSuiteObject);
                _response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
                if (!_response.status.Contains("Fail"))
                {
                    foreach (var testCases in TestSuiteObject.SelectedTestCases)
                    {
                        _helper.RunTestCase(testCases);
                    }
                }
            }
            if (!_response.status.Contains("Fail"))
            {
                //Logic to send Email
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
    }
}
