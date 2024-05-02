using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SeleniumReportAPI.DTO_s;
using SeleniumReportAPI.Helper;
using SeleniumReportAPI.Models;
using System.Security.Claims;

namespace SeleniumReportAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    [ApiController]
    public class FunctionalTestController : ControllerBase
    {
        private readonly DBHelper _helper;

        public FunctionalTestController(DBHelper helper)
        {
            _helper = helper;
        }

        /// <summary>
        /// Get Functional Test
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetFunctionalTest")]
        public async Task<ActionResult> GetFunctionalTest()
        {
            return Ok(await _helper.GetFunctionalTest());
        }

        /// <summary>
        /// Add Functional Test 
        /// </summary>
        /// <param name="FunctionalTest"></param>
        /// <returns></returns>
        [HttpPost("AddFunctionalTest")]
        public async Task<ActionResult> AddFunctionalTest(FuncationalTest model)
        {
            return Ok(await _helper.AddFunctionalTest(model));
        }

        /// <summary>
        ///  Update Functional Test
        /// </summary>
        /// <param RootId="RootId"></param>
        /// <param Name="Name"></param>
        /// <returns></returns>
        [HttpPost("UpdateFunctionalTest")]
        public async Task<ActionResult> UpdateFunctionalTest(FuncationalTest model)
        {
            return Ok(await _helper.UpdateFunctionalTest(model));
        }

        /// <summary>
        ///  Delete Functional Test By Root Id  and Parent Id
        /// </summary>
        /// <param FuncationalTest="FuncationalTest"></param>
        /// <returns></returns>
        [HttpPost("DeleteFunctionalTest")]
        public async Task<ActionResult> DeleteFunctionalTest(FuncationalTest model)
        {
            return Ok(await _helper.DeleteFunctionalTest(model));
        }

        /// <summary>
        /// Get Functional Test Case By RootId
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetFunctionalTestCaseByRootId")]
        public async Task<ActionResult> GetFunctionalTestCaseByRootId(int RootId)
        {
            return Ok(await _helper.GetFunctionalTestCaseByRootId(RootId));
        }

        /// <summary>
        /// Add Functional Test Case
        /// </summary>
        /// <param name="FunctionalTestCase"></param>
        /// <returns></returns>
        [HttpPost("AddFunctionalTestCase")]
        public async Task<ActionResult> AddFunctionalTestCase(FunctionalTestCase model)
        {
            var CreatedBy = User.FindFirst(ClaimTypes.Email)?.Value.ToString();
            return Ok(await _helper.AddFunctionalTestCase(model, CreatedBy));
        }

        /// <summary>
        ///  Update Functional Test Case
        /// </summary>
        /// <param name="FunctionalTestCase"></param>
        /// <returns></returns>
        [HttpPost("UpdateFunctionalTestCase")]
        public async Task<ActionResult> UpdateFunctionalTestCase(FunctionalTestCase model)
        {
            var UpdatedBy = User.FindFirst(ClaimTypes.Email)?.Value.ToString();
            return Ok(await _helper.UpdateFunctionalTestCase(model, UpdatedBy));
        }

        /// <summary>
        ///  Delete Functional Test Case By Id
        /// </summary>
        /// <param Id="Id"></param>
        /// <returns></returns>
        [HttpPost("DeleteFuncationalTestCase")]
        public async Task<ActionResult> DeleteFuncationalTestCase(int Id)
        {
            return Ok(await _helper.DeleteFuncationalTestCase(Id));
        }
    }
}
