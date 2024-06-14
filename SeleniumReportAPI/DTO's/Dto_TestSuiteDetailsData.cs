using Microsoft.AspNetCore.Mvc.Rendering;

namespace TestSeleniumReport.DTO_s
{
    public class Dto_TestSuiteDetailsData
    {
        public int TestSuiteId { get; set; }
        public string TestSuiteName { get; set; }
        public string TestSuiteType { get; set; }
        public int ApplicationId { get; set; }
        public bool SendEmail { get; set; }
        public int EnvironmentId { get; set; }
        public List<string> SelectedTestCases { get; set; }
        public List<SelectListItem> AllTestCases { get; set; }
        public string Description { get; set; }
        public int TestUserId { get; set; }
        public int RootId { get; set; }
    }

    public class ApplicationData
    {
        public int ApplicationId { get; set; }
        public string ApplicationName { get; set; }
    }

    public class EnvironmentData
    {
        public int EnvironmentId { get; set; }
        public string EnvironmentName { get; set; }
        public string BaseUrl { get; set; }
        public string BasePath { get; set; }
        public string DriverPath { get; set; }
    }

    public class TestUserData
    {
        public int TestUserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class TestSuiteNameData
    {
        public string TestSuiteName { get; set; }
        public string TestSuiteType { get; set; }
        public ApplicationData Application { get; set; }
        public bool SendEmail { get; set; }
        public EnvironmentData Environment { get; set; }
        public TestUserData TestUser { get; set; }
        public string SelectedTestCases { get; set; }
        public int TestSuiteId { get; set; }
        public string Description { get; set; }
    }
}