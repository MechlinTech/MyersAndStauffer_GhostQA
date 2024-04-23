﻿using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    public class TestExecutor
    {
        private static string _browsername = "Chrome";
        private static string _environmentname = "dev";
        private static string _baseurl = "https://clocksession.com/";
        private static string _basepath = @"E:\GhostQACode\MyersAndStauffer_GhostQA-LatestCode\MyersAndStauffer_GhostQA-main\MyersAndStaufferAutomation\MyersAndStaufferSeleniumTests\bin\";
        private static string _driverpath = @"E:\GhostQACode\MyersAndStauffer_GhostQA-LatestCode\MyersAndStauffer_GhostQA-main\MyersAndStaufferAutomation\MyersAndStaufferSeleniumTests\bin\x64\Debug\net6.0";
        private static string _ApiUrl = @"http://12.2/api/AddInBuildTestSuite/SaveInBuiltTestSuites";       
        private static bool _isRunHeadless = false;
        private static string _testrunname = Guid.NewGuid().ToString();
        public static string JsonData { get; set; }
        public static bool IsInbuilt = true;

        public static string browserName
        {
            get => _browsername;
            set => _browsername = value;
        }
        public static string TestRunName
        {
            get => _testrunname;
            set => _testrunname = value;
        }
        public static string environmentName
        {
            get => _environmentname;
            set => _environmentname = value;
        }
        public static string testCaseName { get; set; }
        public static string Baseurl
        {
            get => _baseurl;
            set => _baseurl = value;
        }
        public static string Basepath
        {
            get => _basepath;
            set => _basepath = value;
        }
        public static string Driverpath
        {
            get => _driverpath;
            set => _driverpath = value;

        }
        public static string APIpath
        {
            get => _ApiUrl;
            set => _ApiUrl = value;
        }
        public static bool IsRunHeadless
        {
            get => _isRunHeadless;
            set => _isRunHeadless = value;
        }
        public static string Testername { get; set; }

        public string ExecuteTestCases(string browsername, string EnvironmentName, string TestCaseName, string baseurl, string basePath, string driverPath, string testerName)
        {
            IsInbuilt = false;
            browserName = browsername;
            environmentName = EnvironmentName;
            testCaseName = TestCaseName;
            Baseurl = baseurl;
            Basepath = basePath;
            Driverpath = driverPath;
            Testername = testerName;

            var bsTest = new BaseTest(); // Instantiate BaseTest using the new keyword to perform Setup and TearDown
            bsTest.SetUp();
            var smokeTest = new LoginTest(); // Instantiate LoginTest using the new keyword to perform Test Case Operation

            var method = smokeTest.GetType().GetMethod(string.Concat(testCaseName));

            if (method != null)
            {
                method.Invoke(smokeTest, null);
            }
            else
            {
                Console.WriteLine($"Method '{testCaseName}' not found.");
            }
            bsTest.TearDownAsync();
            return JsonData;
        }
    }
}