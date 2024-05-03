using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SeleniumReportAPI.DTO_s;
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

        [Authorize]
        [HttpPost("InviteUser")]
        public async Task<IActionResult> InviteUser(string toEmail)
        {
            try
            {
                string GeneratorPassword = string.Empty;
                string originalUrl = Request.Headers.Referer.ToString();
                int lastSlashIndex = originalUrl.LastIndexOf('/');
                var Url = lastSlashIndex != -1 ? originalUrl.Substring(0, lastSlashIndex + 1) : originalUrl;
                var result = _helper.SendEmail(toEmail, "Invitation", Url, GeneratorPassword);
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
                string originalUrl = Request.Headers.Referer.ToString();
                int lastSlashIndex = originalUrl.LastIndexOf('/');
                var Url = lastSlashIndex != -1 ? originalUrl.Substring(0, lastSlashIndex + 1) : originalUrl;
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

        [HttpPost("SendPasswordResetMail")]
        public async Task<IActionResult> SendPasswordResetMail(Dto_ForgotPassword model)
        {
            var result = await _helper.SendPasswordResetMailAsync(model.Email);

            return result.status == "Success" ? Ok(new { status = result.status, message = "Password reset information has been sent to the user's email." }) : result.status == "NotFound" ? StatusCode(404, new { status = "Failed", message = result.message }) : StatusCode(550, new { status = "Failed", message = result.message });
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(Dto_ResetPassword model)
        {
            var result = await _helper.ResetPasswordAsync(model.Email, model.Token, model.NewPassword);

            return result.status == "Success" ? Ok(new { status = result.status, message = result.message }) : result.status == "NotFound" ? StatusCode(404, new { status = "Failed", message = result.message }) : StatusCode(400, new { status = "Failed", message = result.message });
        }
    }
}