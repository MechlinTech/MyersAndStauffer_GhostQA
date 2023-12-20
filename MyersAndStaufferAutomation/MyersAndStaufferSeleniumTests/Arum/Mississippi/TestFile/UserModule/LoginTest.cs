using AventStack.ExtentReports;
using MyersAndStaufferFramework;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Pages.UserModule;
using Newtonsoft.Json;
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
            var TestSteps = new List<TestStepColumns>();
            VideoRecorder.CreateRecording();
            try
            {
                var logInPage = new LoginPage();
                _testData.TestCaseVideoURL = VideoRecorder.videoPath;
                var dateTime = DateTime.Now;
                _testData.TestRunStartDateTime = dateTime;
                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = dateTime, Details = "wait for plage to loader" });

                logInPage.WaitForPageLoad();
                test.Log(Status.Info, "wait for plage to loader");

                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now, Details = "Click on Login Button" });
                logInPage.ClickonLogin();
                test.Log(Status.Info, "Click on Login Button ghb");

                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now, Details = "Enter Email Test" });
                logInPage.SetEmail("Test");
                test.Log(Status.Info, "Enter Email Test");

                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now, Details = "Click on Login Button" });
                logInPage.SetPassword("Test");
                test.Log(Status.Info, "Enter passoword test");

                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now, Details = "Click on Login Button" });
                logInPage.SubmitLogIn();
                test.Log(Status.Info, "Click on LoSubmit button Test");
                _testData.TestRunEndDateTime = DateTime.Now;
                _testData.TestCaseSteps = JsonConvert.SerializeObject(TestSteps);
            }
            catch (Exception)
            {
                TestSteps.ForEach(step => step.Status = "Failed");
                _testData.TestRunEndDateTime = DateTime.Now;
                _testData.TestCaseSteps = JsonConvert.SerializeObject(TestSteps);
            }
            VideoRecorder.EndRecording();
        }


        [Test, Order(1)]
        public void VerifyLoginOK2()
        {
            var TestSteps = new List<TestStepColumns>();
            VideoRecorder.CreateRecording();
            try
            {
                var logInPage = new LoginPage();
                _testData.TestCaseVideoURL = VideoRecorder.videoPath;
                var dateTime = DateTime.Now;
                _testData.TestRunStartDateTime = dateTime;
                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = dateTime, Details = "wait for plage to loader" });
                logInPage.WaitForPageLoad();
                test.Log(Status.Info, "wait for plage to loader");

                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now, Details = "Click on Login Button" });
                logInPage.ClickonLogin();
                test.Log(Status.Info, "Click on Login Button ghb");

                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now, Details = "Enter Email Test" });
                logInPage.SetEmail("Test");
                test.Log(Status.Info, "Enter Email Test");

                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now, Details = "Click on Login Button" });
                logInPage.SetPassword("Test");
                test.Log(Status.Info, "Enter passoword test");

                TestSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now, Details = "Click on Login Button" });
                logInPage.SubmitLogIn();
                test.Log(Status.Info, "Click on LoSubmit button Test");
                _testData.TestRunEndDateTime = DateTime.Now;
                _testData.TestCaseSteps = JsonConvert.SerializeObject(TestSteps);
            }
            catch (Exception)
            {
                TestSteps.ForEach(step => step.Status = "Failed");
                _testData.TestRunEndDateTime = DateTime.Now;
                _testData.TestCaseSteps = JsonConvert.SerializeObject(TestSteps);
            }
            VideoRecorder.EndRecording();
        }
    }
}
