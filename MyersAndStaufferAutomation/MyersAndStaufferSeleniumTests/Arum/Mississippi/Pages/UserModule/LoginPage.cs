using MyersAndStaufferSeleniumTests.Arum.Mississippi.Data;
using MyersAndStaufferSeleniumTests.Utils;
using OpenQA.Selenium;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.Pages.UserModule
{
    public class LoginPage : BasePage
    {
        public override string PageURL => $"{BaseURL}";

        // Page Elements

        public IWebElement Login => driver.FindElementWhenVisible(() => By.XPath("//a[contains(text(),'Login')]"));
        public IWebElement EmailInput => driver.FindElementWhenVisible(() => By.XPath("//input[@name='email']"));

        public IWebElement PasswordInput => driver.FindElement(By.XPath("//input[@name='password']"));

        public IWebElement LogInButton => driver.FindElement(By.XPath("//button[contains(text(),'LOGINfail')]"));

        // Methods
        public void WaitForPageLoad()
        {
            driver.WaitUntilElementIsDisplayed(() => Login, timeoutInSeconds: 120);
            
        }

        public void ClickonLogin()
        {
            
            Login.Click();
        }

        public void SetEmail(string username)
        {
            EmailInput.Click();
            driver.ActionSendKeys(EmailInput, username);
        }

        public bool IsPasswordInputVisible()
        {
            return PasswordInput.IsElementVisibleAndEnabled();
        }

        public void SetPassword(string password)
        {
            PasswordInput.Click();
            driver.ActionSendKeys(PasswordInput, password);
        }

        public bool IsLoginButtonVisible()
        {
            return LogInButton.IsElementVisibleAndEnabled();
        }

        public void SubmitLogIn()
        {
            LogInButton.Click();
        }

        public void LogIn(LoginInfo loginInfo)
        {
            LogMessage("Calling WaitForPageLoad");
            WaitForPageLoad();
            ClickonLogin();

            LogMessage($"Setting login info and submitting: {loginInfo.Email}");
            SetEmail(loginInfo.Email);
            SetPassword(loginInfo.Password);

            SubmitLogIn();
        }

        public bool LoginSuccess()
        {
            // This could probably be better
            var elements = driver.FindElements(By.XPath("//strong[contains(text(),'Log Out')]"));
            return elements.Count > 0;
        }
    }
}
