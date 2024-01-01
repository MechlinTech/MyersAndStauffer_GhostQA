using AventStack.ExtentReports;
using MyersAndStaufferFramework;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Pages.UserModule;
using NUnit.Framework;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule
{
    [TestFixture]
    [Property("Priority", 0)] // Smoke Test to make sure  LogIn is not blocked
    public class LoginTest : BaseTest
    {
        [Test, Order(0)]
        public void VerifyLoginOK()
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
}
