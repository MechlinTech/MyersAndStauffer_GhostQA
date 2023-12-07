namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.Data
{
    public enum LoginType
    {
        GenericTestUser
    }

    public class LoginInfo
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class Authentication : Dictionary<LoginType, LoginInfo>
    {
        public Authentication()
        {
            Add(LoginType.GenericTestUser, new LoginInfo()
            {
                Email = "msharma@mslc.com",
                Password = "Mechlin_123$$$"  // TODO: get this from the environment
            });
        }
    }
}
