using AventStack.ExtentReports;
using MyersAndStaufferSeleniumTests.Arum.Mississippi.Pages.UserModule;
using NUnit.Framework;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule
{
    [TestFixture]
    [Property("Priority", 0)] // Smoke Test to make sure  LogIn is not blocked
    public class LoginTest : BaseTest
    {
        [Test, Order(1)]
        public void VerifyLoginOK()
        {
            var logInPage = new LoginPage();

            logInPage.WaitForPageLoad();
            test.Log(Status.Info, "wait for plage to load");
            logInPage.ClickonLogin();
            test.Log(Status.Info, "Click on Login Button");
            logInPage.SetEmail("Test");
            test.Log(Status.Info, "Enter Email");
            logInPage.SetPassword("Test");
            test.Log(Status.Info, "Enter passoword");
            logInPage.SubmitLogIn();
            test.Log(Status.Info, "Click on LoSubmit button");
        }


        [Test, Order(1)]
        public void VerifyLoginOK2()
        {
            var logInPage = new LoginPage();

            logInPage.WaitForPageLoad();
            test.Log(Status.Info, "wait for plage to loader");
            logInPage.ClickonLogin();
            test.Log(Status.Info, "Click on Login Button ghb");
            logInPage.SetEmail("Test");
            test.Log(Status.Info, "Enter Email Test");
            logInPage.SetPassword("Test");
            test.Log(Status.Info, "Enter passoword test");
            logInPage.SubmitLogIn();
            test.Log(Status.Info, "Click on LoSubmit button Test");
        }
    }
}
