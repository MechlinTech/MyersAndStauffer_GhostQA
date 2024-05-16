﻿using MyersAndStaufferFramework;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Pages.UserModule;
using MyersAndStaufferSeleniumTests.Utils;
using NUnit.Framework;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule
{
    [TestFixture]
    [Property("Priority", 0)] // Smoke Test to make sure  LogIn is not blocked
    public class LoginTest : BaseTest
    {
        public static TestData _testData = TestDataSharedInstance.testData;
        public static string Username = TestExecutor.Username;
        public static string Password = TestExecutor.Password;

        [Test, Order(0)]
        public void Verify_User_Is_Able_To_Login()
        {
            _testData.TestSuiteName = "ClockSession";
            _testData.TestCaseName = "Verify_User_Is_Able_To_Login";
            _testSteps = new List<TestStepColumns> { new TestStepColumns() };
            

            try
            {
                var logInPage = new LoginPage();
                var dateTime = DateTime.Now.ToString("dd-MMM-yyyy_HH-mm-ss");
                _testData.TestRunStartDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");

                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "wait for page to loader" });
                logInPage.WaitForPageLoad();
                VideoRecorder.ScreenShot(dateTime);

                

                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = $"Enter Email {Password}" });
                logInPage.SetEmail(Username);
                VideoRecorder.ScreenShot(dateTime);


                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = $"Enter passoword {Password}" });
                logInPage.SetPassword(Password);
                VideoRecorder.ScreenShot(dateTime);


                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Submit button Test" });
                logInPage.SubmitLogIn();
                VideoRecorder.ScreenShot(dateTime);

                _testData.TestCaseStatus = "Passed";
            }
            catch (Exception ex)
            {
                BaseTest.stackTrace = ex.StackTrace;
                BaseTest.message = ex.Message;
                BaseTest.status = "Failed";
                _testData.TestCaseStatus = "Failed";
                Console.WriteLine(ex.StackTrace);
            }
        }

        [Test, Order(1)]
        public void VerifyLoginOK2()
        {
            _testData.TestCaseName = "VerifyLoginOK2";
            _testData.TestSuiteName = "ClockSession";

            _testSteps = new List<TestStepColumns> { new TestStepColumns() };
            try
            {

                var logInPage = new LoginPage();

                var dateTime = DateTime.Now.ToString("dd-MMM-yyyy_HH-mm-ss");
                _testData.TestRunStartDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");
                VideoRecorder.ScreenShot(dateTime);


                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "wait for page to load" });
                logInPage.WaitForPageLoad();
                VideoRecorder.ScreenShot(dateTime);
              

                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = $"Enter Email {Username}" });
                logInPage.SetEmail(Username);
                VideoRecorder.ScreenShot(dateTime);

                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = $"Enter passoword  {Password}" });
                logInPage.SetPassword(Password);
                VideoRecorder.ScreenShot(dateTime);


                _testData.TestCaseStatus = "Passed";
                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Submit button Test" });
                logInPage.SubmitLogIn();
            }
            catch (Exception ex)
            {
                BaseTest.stackTrace = ex.StackTrace;
                BaseTest.message = ex.Message;
                BaseTest.status = "Failed";
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

            try
            {


                var logInPage = new LoginPage();

                var dateTime = DateTime.Now.ToString("dd-MMM-yyyy_HH-mm-ss");
                _testData.TestRunStartDateTime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz");

                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "wait for page to loader" });
                logInPage.WaitForPageLoad();
                VideoRecorder.ScreenShot(dateTime);

                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = $"Enter Email {Username}" });
                logInPage.SetEmail(Username);
                VideoRecorder.ScreenShot(dateTime);


                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = $"Enter passoword {Password}" });
                logInPage.SetPassword(Password);
                VideoRecorder.ScreenShot(dateTime);


                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Click on Submit button Test" });
                logInPage.SubmitLogIn();
                VideoRecorder.ScreenShot(dateTime);

                _testData.TestCaseStatus = "Passed";
                Assert.IsTrue(logInPage.LoginSuccess());
                VideoRecorder.ScreenShot(dateTime);
                _testSteps.Add(new TestStepColumns { Status = "Passed", Timestamp = DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss.fffffffzzz"), Details = "Login Success" });
            }
            catch (Exception ex)
            {
                BaseTest.stackTrace = ex.StackTrace;
                BaseTest.message = ex.Message;
                BaseTest.status = "Failed";
                _testData.TestCaseStatus = "Failed";
                Console.WriteLine(ex.StackTrace);
            }
        }
    }
}