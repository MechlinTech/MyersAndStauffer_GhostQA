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
        public async Task<ActionResult> AddTestStepsDetails(Dto_AddTestStepsJson addStepsJson)
        {
            return Ok(await _helper.AddTestStepsDetails(addStepsJson));
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

        /// <summary>
        ///  Get TestCaseDetails By RootId 
        /// </summary>
        /// <param RootId="RootId"></param>
        /// <returns></returns>
        [HttpPost("GetTestCaseDetailsByRootId")]
        public async Task<ActionResult> GetTestCaseDetailsByRootId(int RootId)
        {
            return Ok(await _helper.GetTestCaseDetailsByRootId(RootId));
        }

        /// <summary>
        ///  Get TestStepsDetails By TestStepsId 
        /// </summary>
        /// <param TestStepsId="TestStepsId"></param>
        /// <returns></returns>
        [HttpGet("GetTestStepsDetailsByTestStepsId")]
        public async Task<ActionResult> GetTestStepsDetailsByTestStepsId(int TestStepsId)
        {
            return Ok(await _helper.GetTestStepsDetailsByTestStepsId(TestStepsId));
        }

        /// <summary>
        ///  Update Root Relation 
        /// </summary>
        /// <param TestStepsDetails="TestStepsDetails"></param>
        /// <returns></returns>
        //[HttpPost("UpdateTestStepsDetails")]
        //public async Task<ActionResult> UpdateTestStepsDetails(TestStepsDetails model)
        //{
        //    return Ok(await _helper.UpdateTestStepsDetails(model));
        //}

        /// <summary>
        ///  Delete Root Relation By Root Id  and Parent Id
        /// </summary>
        /// <param TestStepsDetails="TestStepsDetails"></param>
        /// <returns></returns>
        [HttpPost("DeleteRootRelation")]
        public async Task<ActionResult> DeleteRootRelation(RootRelation model)
        {
            return Ok(await _helper.DeleteRootRelation(model));
        }

        /// <summary>
        ///  Get Excuted By RootId 
        /// </summary>
        /// <param RootId="RootId"></param>
        /// <returns></returns>
        [HttpGet("GetExcutedByRootId")]
        public async Task<ActionResult> GetExcutedByRootId(int RootId, string TestName)
        {
            return Ok(await _helper.GetExcutedByRootId(RootId, TestName));
        }

        /// <summary>
        /// Add Execute Result
        /// </summary>
        /// <param name="Dto_RootObject"></param>
        /// <returns></returns>
        [HttpPost("AddExecuteResult")]
        public async Task<ActionResult> AddExecuteResult(int testCaseDetailId, Dto_RootObject json)
        {
            return Ok(await _helper.AddExecuteResult(testCaseDetailId, json));
        }

        /// <summary>
        ///  Get TestDetail By TestName 
        /// </summary>
        /// <param TestName="TestName"></param>
        /// <returns></returns>
        [HttpGet("GetTestDetailByTestName")]
        public async Task<ActionResult> GetTestDetailByTestName(string TestName)
        {
            return Ok(await _helper.GetTestDetailByTestName(TestName));
        }

        /// <summary>
        ///  Get Test Steps Detail By TestCaseId
        /// </summary>
        /// <param TestCaseId="TestCaseId"></param>
        /// <returns></returns>
        [HttpGet("GetTestStepsDetailByTestCaseId")]
        public async Task<ActionResult> GetTestStepsDetailByTestCaseId(string TestCaseId)
        {
            return Ok(await _helper.GetTestStepsDetailByTestCaseId(TestCaseId));
        }

        /// <summary>
        ///  Get Test Case Detail By TestCaseId
        /// </summary>
        /// <param TestCaseId="TestCaseId"></param>
        /// <returns></returns>
        [HttpGet("GetTestCaseDetailsByTestDetailId")]
        public async Task<ActionResult> GetTestCaseDetailsByTestDetailId(int TestCaseId)
        {
            return Ok(await _helper.GetTestCaseDetailsByTestDetailId(TestCaseId));
        }

        /// <summary>
        /// Update Test Case Details
        /// </summary>
        /// <param name="TestCaseDetails"></param>
        /// <returns></returns>
        [HttpPost("UpdateTestCaseDetails")]
        public async Task<ActionResult> UpdateTestCaseDetails(TestCaseDetails model)
        {
            return Ok(await _helper.UpdateTestCaseDetails(model));
        }

        /// <summary>
        ///  Delete TestCaseDetails By TestCaseDetailsId
        /// </summary>
        /// <param TestCaseDetailsId="TestCaseDetailsId"></param>
        /// <returns></returns>
        [HttpPost("DeleteTestCaseDetailsByTestCaseDetailsId")]
        public async Task<ActionResult> DeleteTestCaseDetailsByTestCaseDetailsId(int TestCaseDetailsId)
        {
            return Ok(await _helper.DeleteTestCaseDetailsByTestCaseDetailsId(TestCaseDetailsId));
        }
    }
}
