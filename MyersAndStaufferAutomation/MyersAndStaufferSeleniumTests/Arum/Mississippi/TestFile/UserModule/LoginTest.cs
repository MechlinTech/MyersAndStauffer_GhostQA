using AventStack.ExtentReports;
using MyersAndStaufferFramework;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Pages.UserModule;
using MyersAndStaufferSeleniumTests.Utils;
using NUnit.Framework;
using System.Linq.Expressions;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule
{
    [TestFixture]
    [Property("Priority", 0)] // Smoke Test to make sure  LogIn is not blocked
    public class LoginTest : BaseTest
    {
        public static TestData _testData = TestDataSharedInstance.testData;
        public static String testname;
        
        [Test, Order(0)]
        //[TestCase(null, TestName = "Clocksession")]
        //[Category("MyTestCase")]
        public void Verify_User_Is_Able_To_Login()
        {
            testname = TestContext.CurrentContext.Test.Name;
            Console.WriteLine("test =" + testname);
            getcurrentTestName();
            _testData.TestCaseName = "VerifyLoginOK";
            _testSteps = new List<TestStepColumns> { new TestStepColumns() };

            VideoRecorder.CreateRecording();
            var logInPage = new LoginPage();
            _testData.TestCaseVideoURL = @"\" + (VideoRecorder.videoPath.StartsWith(VideoRecorder.basePath) ? VideoRecorder.videoPath.Substring(VideoRecorder.basePath.Length).ToString() : VideoRecorder.videoPath.ToString());
            Console.WriteLine(_testData.TestCaseVideoURL);

            var dateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestRunStartDateTime = dateTime;


            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = dateTime, Details = "wait for plage to loader" });
            logInPage.WaitForPageLoad();
            test.Log(Status.Info, "wait for plage to loader");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Login Button" });
            logInPage.ClickonLogin();
            test.Log(Status.Info, "Click on Login Button ghb");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter Email Test" });
            logInPage.SetEmail("Test");
            test.Log(Status.Info, "Enter Email Test");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter passoword test" });
            logInPage.SetPassword("Test");
            test.Log(Status.Info, "Enter passoword test");
            try
            {
                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Submit button Test" });
                logInPage.SubmitLogIn();
                test.Log(Status.Info, "Click on LoSubmit button Test");
                _testData.TestCaseStatus = "Passed";

            }
            catch (Exception ex)
            {
                _testData.TestCaseStatus = "Failed";
            }



        }

        public string getcurrentTestName()
        {
            string testname1 = testname;
            return testname1;
        }

        //[TestCase(null, TestName = "Mississippi")]
        [Test, Order(1)]
        public void VerifyLoginOK2()
        {

            _testSteps = new List<TestStepColumns> { new TestStepColumns() };

            VideoRecorder.CreateRecording();
            var logInPage = new LoginPage();
            _testData.TestCaseVideoURL = @"\" + (VideoRecorder.videoPath.StartsWith(VideoRecorder.basePath) ? VideoRecorder.videoPath.Substring(VideoRecorder.basePath.Length).ToString() : VideoRecorder.videoPath.ToString());
            var dateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestRunStartDateTime = dateTime;

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = dateTime, Details = "wait for plage to loader" });
            logInPage.WaitForPageLoad();
            test.Log(Status.Info, "wait for plage to loader");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Login Button" });
            logInPage.ClickonLogin();
            test.Log(Status.Info, "Click on Login Button ghb");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter Email Test" });
            logInPage.SetEmail("Test");
            test.Log(Status.Info, "Enter Email Test");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter passoword test" });
            logInPage.SetPassword("Test");
            test.Log(Status.Info, "Enter passoword test");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Submit button Test" });
            logInPage.SubmitLogIn();
            test.Log(Status.Info, "Click on LoSubmit button Test");
        }
    }

    public class TestExecutor()
    {
        public static string JsonData { get; set; }
        public string RunVerifyLoginOK(BrowserDriver browserDriver, String EnvironmentName, String TestName)
        {

            var setup = new SetupClass(); // Instantiate SetupClass using the new keyword to perform Initialize Dll
            setup.Initialize();
            var bsTest = new BaseTest(); // Instantiate BaseTest using the new keyword to perform Setup and TearDown
            bsTest.SetUp();
            var loginTest = new LoginTest(); // Instantiate LoginTest using the new keyword to perform Test Case Operation
            loginTest.Verify_User_Is_Able_To_Login();
            bsTest.TearDown();
            return JsonData;
        }

        public static void RunVerifyLoginOK2()
        {
            var setup = new SetupClass(); // Instantiate SetupClass using the new keyword to perform Initialize Dll
            setup.Initialize();
            var bsTest = new BaseTest(); // Instantiate BaseTest using the new keyword to perform Setup and TearDown
            bsTest.SetUp();
            var loginTest = new LoginTest(); // Instantiate LoginTest using the new keyword to perform Test Case Operation
            loginTest.VerifyLoginOK2();
            bsTest.TearDown();
        }
    }
}
