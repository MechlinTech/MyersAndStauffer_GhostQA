using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile
{
    public class TestExecutor
    {
        private static string _browsername = "Chrome";
        private static string _environmentname = "dev";
        private static string _baseurl = "https://clocksession.com/";
        private static string _basepath = "C:\\Users\\Nitin\\source\\repos\\MyersAndStauffer_GhostQA1\\MyersAndStauffer_GhostQA1\\TestSeleniumReport\\wwwroot\\";
        private static string _driverpath = "C:\\Users\\Nitin\\source\\repos\\MyersAndStauffer_GhostQA1\\MyersAndStauffer_GhostQA1\\MyersAndStaufferAutomation\\MyersAndStaufferSeleniumTests\\bin\\x64\\Debug\\net6.0";
       public static string JsonData { get; set; }
        public static string browserName 
        { 
            get => _browsername; 
            set => _browsername = value; 
        }
        public static string environmentName 
        { 
            get => _environmentname; 
            set => _environmentname = value; }
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

        
        public static string ExecuteTestCases(string browsername, string EnvironmentName, string TestCaseName, string baseurl, string basePath, string driverPath, string testerName)
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
            

            var method = loginTest.GetType().GetMethod(string.Concat(testCaseName));

            if (method != null)
            {
                method.Invoke(loginTest,null);              
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

