using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SeleniumReportAPI.DTO_s;
using SeleniumReportAPI.Helper;
using SeleniumReportAPI.Models;

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

        [Authorize]
        [HttpPost("InviteUser")]
        public async Task<IActionResult> InviteUser(string toEmail)
        {
            try
            {
                var Url = Request.Headers.Referer.ToString();
                var result = _helper.SendEmail(toEmail, "Invitation", Url);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost("AcceptInvitation")]
        public async Task<IActionResult> AcceptInvitation(string toEmail)
        {
            try
            {
                var Url = Request.Headers.Referer.ToString();
                var result = await _helper.AcceptInvitation(toEmail, Url);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] Dto_ChangePassword model)
        {
            try
            {
                var result = await _helper.ChangePasswordAsync(model);

                if (result.Succeeded)
                {
                    return Ok(new
                    {
                        status = "Success",
                        message = "Password Changed Successfully"
                    });
                }
                else
                {
                    // Concatenate error descriptions into a single string
                    string errors = string.Join(", ", result.Errors.Select(e => e.Description));

                    return Ok(new
                    {
                        status = "Failed",
                        message = errors
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    status = "Error",
                    message = ex.Message
                });
            }
        }
        [HttpPost("UploadFile")]
        public async Task<IActionResult> Upload(string fileBasePath, IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("File not selected");
                // string filePath = @"";
                var result = await _helper.UploadFiles(file, fileBasePath);
                string status = string.Empty;
                string messages = string.Empty;
                if (result == "Success")
                    messages = "File Uploaded Successfully";
                else
                    messages = "File Uploaded Failed";

                return Ok(new
                {
                    status = result,
                    message = messages
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}