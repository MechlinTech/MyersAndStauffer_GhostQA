namespace GhostQA_API.DTO_s
{
    public class Dto_ChangePassword
    {
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}