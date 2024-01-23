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
        public static string JsonData { get; set; }
        public static string browserName { get; set; }
        public static string environmentName { get; set; }
        public static string testCaseName { get; set; }
        public static string Baseurl { get; set; }
        public static string Basepath { get; set; }
        public static string Driverpath { get; set; }
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
            bsTest.TearDown();
            return JsonData;

        }
    }
}

