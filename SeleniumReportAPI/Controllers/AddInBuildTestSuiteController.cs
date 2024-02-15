using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SeleniumReportAPI.Helper;

namespace SeleniumReportAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AddInBuildTestSuiteController : ControllerBase
    {
        private readonly DBHelper _helper;

        public AddInBuildTestSuiteController(DBHelper helper)
        {
            _helper = helper;
        }

        [HttpPost("SaveInBuiltTestSuites")]
        public async Task<IActionResult> SaveInBuiltTestSuites(Object testDataJson)
        {
            try
            {
                var result = await _helper.SaveInBuiltTestSuites(testDataJson);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpPost("UpdateInBuiltTestSuitesTestStepsJson")]
        public async Task<IActionResult> UpdateInBuiltTestSuitesTestStepsJson(string testStepJson, string testSuite, string testRun, string testCase)
        {
            try
            {
                var result = await _helper.UpdateInBuiltTestSuitesTestStepsJson(testStepJson, testSuite, testRun, testCase);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}