using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeleniumReportAPI.Helper;

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
    }
}
