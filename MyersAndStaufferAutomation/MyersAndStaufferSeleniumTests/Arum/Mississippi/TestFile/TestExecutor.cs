﻿using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    public class TestExecutor
    {
        private static string _browsername = "Chrome";
        private static string _environmentname = "dev";
        private static string _baseurl = "https://clocksession.com/";
        private static string _basepath = @"C:\GhostQA\SeleniumReportAPI\wwwroot\";
        private static string _driverpath = @"C:\GhostQA\SeleniumReportAPI\wwwroot\Driver";
        public static string JsonData { get; set; }
        public static string browserName
        {
            get => _browsername;
            set => _browsername = value;
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
        public static string Testername { get; set; }

        public string ExecuteTestCases(string browsername, string EnvironmentName, string TestCaseName, string baseurl, string basePath, string driverPath, string testerName)
        {
            browserName = browsername;
            environmentName = EnvironmentName;
            testCaseName = TestCaseName;
            Baseurl = baseurl;
            Basepath = basePath;
            Driverpath = driverPath;
            Testername = testerName;

            var bsTest = new BaseTest(); // Instantiate BaseTest using the new keyword to perform Setup and TearDown
            bsTest.SetUp();
            var loginTest = new LoginTest(); // Instantiate LoginTest using the new keyword to perform Test Case Operation

            var method = loginTest.GetType().GetMethod(testCaseName);

            if (method != null)
            {
                try
                {
                    method.Invoke(loginTest, null);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception occurred while invoking method '{testCaseName}': {ex.Message}");
                }
                finally
                {
                    bsTest.TearDown();
                }
            }
            else
            {
                Console.WriteLine($"Method '{testCaseName}' not found.");
            }

            return JsonData;
        }
    }
}