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

    }
}
