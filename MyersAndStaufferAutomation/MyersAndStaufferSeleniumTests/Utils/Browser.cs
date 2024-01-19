using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.IO;

namespace MyersAndStaufferSeleniumTests.Utils
{
    public enum BrowserDriver
    {
        Chrome,
        Firefox,
        InternetExplorer,
        Safari
    }

    public static class Browser
    {
        private static IWebDriver _driver;
        public static string _preloader = null;
        public static string downloadDirectory { get; set; }
        public static IWebDriver Driver
        {
            get { return _driver; }
        }

        public static void Start(BrowserDriver driver = BrowserDriver.Chrome, bool isRunHeadless = false, WindowSize windowSize = null)
        {
            String driverpath = "C:\\Users\\Nitin\\source\\repos\\MyersAndStauffer_GhostQA1\\MyersAndStauffer_GhostQA1\\MyersAndStaufferAutomation\\MyersAndStaufferSeleniumTests\\bin\\x64\\Debug\\net6.0";
            switch (driver)
            {
                case BrowserDriver.Chrome:
                    ChromeOptions chromeOptions = new ChromeOptions();
                    chromeOptions.AddArgument("--incognito");
                    chromeOptions.AddArgument("test-type");
                    chromeOptions.AddArgument("--ignore-certificate-errors");

                    var timestamp = DateTime.Now.ToFileTime();
                    downloadDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "SeleniumDownload", timestamp.ToString());
                    Directory.CreateDirectory(downloadDirectory);

                    chromeOptions.AddUserProfilePreference("download.default_directory", downloadDirectory);
                    chromeOptions.AddUserProfilePreference("download.prompt_for_download", false);
                    chromeOptions.AddUserProfilePreference("disable-popup-blocking", "true");

                    if (isRunHeadless)
                        chromeOptions.AddArguments("headless");

                    _driver = new ChromeDriver(driverpath, chromeOptions);
                    if (windowSize != null)
                    {
                        _driver.Manage().Window.Size = new System.Drawing.Size(windowSize.Width, windowSize.Height);
                    }
                    else
                    {
                        _driver.Manage().Window.Maximize();
                    }

                    break;

                // TODO: Add support for other Browsers
                case BrowserDriver.Firefox:
                case BrowserDriver.InternetExplorer:
                case BrowserDriver.Safari:
                    throw new NotImplementedException();
            }
        }
    }
}
