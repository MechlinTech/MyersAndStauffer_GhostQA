using AventStack.ExtentReports;
using MyersAndStaufferFramework;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Pages.UserModule;
using MyersAndStaufferSeleniumTests.Utils;
using NUnit.Framework;
using System;
using System.Linq.Expressions;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule
{
    [TestFixture]
    [Property("Priority", 0)] // Smoke Test to make sure  LogIn is not blocked
    public class LoginTest : BaseTest
    {
        public static TestData _testData = TestDataSharedInstance.testData;
        public static String testname;
        public static string Status; public static string Message;
        public static string StackTrace;
        public static string EnvName;

        [Test, Order(0)]
        public void Verify_User_Is_Able_To_Login()
        {

            _testData.TestCaseName = "VerifyLoginOK";
            _testSteps = new List<TestStepColumns> { new TestStepColumns() };
            VideoRecorder.CreateRecording(TestExecutor.Basepath);
            var logInPage = new LoginPage();
            _testData.TestCaseVideoURL = @"\" + (VideoRecorder.videoPath.StartsWith(VideoRecorder.basePath) ? VideoRecorder.videoPath.Substring(VideoRecorder.basePath.Length).ToString() : VideoRecorder.videoPath.ToString());
            Console.WriteLine(_testData.TestCaseVideoURL);

            var dateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestRunStartDateTime = dateTime;

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = dateTime, Details = "wait for plage to loader" });
            logInPage.WaitForPageLoad();

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Login Button" });
            logInPage.ClickonLogin();

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter Email Test" });
            logInPage.SetEmail("Test");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter passoword test" });
            logInPage.SetPassword("Test");
            try
            {
                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Submit button Test" });
                logInPage.SubmitLogIn();
                _testData.TestCaseStatus = "Passed";
            }
            catch (Exception ex)
            {
                StackTrace = ex.StackTrace;
                Message = ex.Message;
                Status = "Failed";
                _testData.TestCaseStatus = "Failed";
                Console.WriteLine(ex.StackTrace);
            }
        }

      
        [Test, Order(1)]
        public void VerifyLoginOK2()
        {
            _testData.TestCaseName = "VerifyLoginOK";
            _testData.TestSuiteName = "ClockSession";
            _testSteps = new List<TestStepColumns> { new TestStepColumns() };

            VideoRecorder.CreateRecording(TestExecutor.Basepath);
            var logInPage = new LoginPage();
            _testData.TestCaseVideoURL = @"\" + (VideoRecorder.videoPath.StartsWith(VideoRecorder.basePath) ? VideoRecorder.videoPath.Substring(VideoRecorder.basePath.Length).ToString() : VideoRecorder.videoPath.ToString());
            var dateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestRunStartDateTime = dateTime;

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = dateTime, Details = "wait for plage to loader" });
            logInPage.WaitForPageLoad();

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Login Button" });
            logInPage.ClickonLogin();

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter Email Test" });
            logInPage.SetEmail("Test");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter passoword test" });
            logInPage.SetPassword("Test");
            try
            {
                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Submit button Test" });
                logInPage.SubmitLogIn();
            }
            catch (Exception ex)
            {
                StackTrace = ex.StackTrace;
                Message = ex.Message;
                Status = "Failed";
                _testData.TestCaseStatus = "Failed";
                Console.WriteLine(ex.StackTrace);
            }
        }

        [Test, Order(1)]
        public void Verify_User_is_able_to_Login_Successfully()
        {
            _testData.TestCaseName = "Verify_User_is_able_to_Login_Successfully";
            _testData.TestSuiteName = "ClockSession";
            _testSteps = new List<TestStepColumns> { new TestStepColumns() };

            VideoRecorder.CreateRecording(TestExecutor.Basepath);
            var logInPage = new LoginPage();
            _testData.TestCaseVideoURL = @"\" + (VideoRecorder.videoPath.StartsWith(VideoRecorder.basePath) ? VideoRecorder.videoPath.Substring(VideoRecorder.basePath.Length).ToString() : VideoRecorder.videoPath.ToString());
            var dateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
            _testData.TestRunStartDateTime = dateTime;

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = dateTime, Details = "wait for plage to loader" });
            logInPage.WaitForPageLoad();

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Login Button" });
            logInPage.ClickonLogin();

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter Email Test" });
            logInPage.SetEmail("nitin.srivastava@mechlintech.com");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Enter passoword test" });
            logInPage.SetPassword("Nit@96553");

            _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Submit button Test" });
            logInPage.SubmitLogIn();

            try
            {
                Assert.IsTrue(logInPage.LoginSuccess());
                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Login Success" });

            }
            catch (Exception ex)
            {
                StackTrace = ex.StackTrace;
                Message = ex.Message;
                Status = "Failed";
                _testData.TestCaseStatus = "Failed";
                Console.WriteLine(ex.StackTrace);
            }
        }
    }
}
