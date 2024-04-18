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
        ///  Update Root Relation 
        /// </summary>
        /// <param RootId="RootId"></param>
        /// <param Name="Name"></param>
        /// <returns></returns>
        //[HttpPost("UpdateRootRelation")]
        //public async Task<ActionResult> UpdateRootRelation(RootRelation model)
        //{
        //    return Ok(await _helper.UpdateRootRelation(model));
        //}

    }
}
