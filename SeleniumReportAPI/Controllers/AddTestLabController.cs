using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SeleniumReportAPI.DTO_s;
using SeleniumReportAPI.Helper;
using SeleniumReportAPI.Models;

namespace SeleniumReportAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class AddTestLabController : ControllerBase
    {
        private readonly DBHelper _helper;

        public AddTestLabController(DBHelper helper)
        {
            _helper = helper;
        }

        /// <summary>
        /// Get Root Relation
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetDataRootRelation")]
        public async Task<ActionResult> GetDataRootRelation()
        {
            return Ok(await _helper.GetDataRootRelation());
        }

        /// <summary>
        /// Get Test CaseDetails
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetTestCaseDetails")]
        public async Task<ActionResult> GetTestCaseDetails()
        {
            return Ok(await _helper.GetTestCaseDetails());
        }

        /// <summary>
        /// Get Test Steps Details
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetTestStepsDetails")]
        public async Task<ActionResult> GetTestStepsDetails()
        {
            return Ok(await _helper.GetTestStepsDetails());
        }

        /// <summary>
        /// Add Root Relation
        /// </summary>
        /// <param RootRelation="RootRelation"></param>
        /// <returns></returns>
        [HttpPost("AddRootRelation")]
        public async Task<ActionResult> AddRootRelation(RootRelation model)
        {
            return Ok(await _helper.AddRootRelation(model));
        }

        /// <summary>
        /// Add Test Case Details
        /// </summary>
        /// <param TestCaseDetails="TestCaseDetails"></param>
        /// <returns></returns>
        [HttpPost("AddTestCaseDetails")]
        public async Task<ActionResult> AddTestCaseDetails(TestCaseDetails model)
        {
            return Ok(await _helper.AddTestCaseDetails(model));
        }

        /// <summary>
        ///  Add Test Steps Details 
        /// </summary>
        /// <param TestStepsDetails="TestStepsDetails"></param>
        /// <returns></returns>
        [HttpPost("AddTestStepsDetails")]
        public async Task<ActionResult> AddTestStepsDetails(TestStepsDetails model)
        {
            return Ok(await _helper.AddTestStepsDetails(model));
        }

        /// <summary>
        ///  Update Root Relation 
        /// </summary>
        /// <param RootId="RootId"></param>
        /// /// <param Name="Name"></param>
        /// <returns></returns>
        [HttpPost("UpdateRootRelation")]
        public async Task<ActionResult> UpdateRootRelation(RootRelation model)
        {
            return Ok(await _helper.UpdateRootRelation(model));
        }
    }
}
