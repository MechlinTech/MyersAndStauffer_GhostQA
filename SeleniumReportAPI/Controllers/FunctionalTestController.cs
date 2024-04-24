using GhostQA_API.Helper;
using GhostQA_API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace GhostQA_API.Controllers
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
    }
}
