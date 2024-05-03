namespace SeleniumReportAPI.DTO_s
{
    public class Dto_ResetPassword
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }
}
