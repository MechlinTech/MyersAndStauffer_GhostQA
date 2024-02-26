using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SeleniumReportAPI.Helper;

namespace SeleniumReportAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
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

        [HttpPost("InviteUser")]
        public async Task<IActionResult> InviteUser(string toEmail)
        {
            try
            {
                var result = _helper.SendEmail(toEmail, "Invitation");
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("AcceptInvitation")]
        public async Task<IActionResult> AcceptInvitation(string toEmail)
        {
            try
            {
                var result = _helper.AcceptInvitation(toEmail);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

    }
}