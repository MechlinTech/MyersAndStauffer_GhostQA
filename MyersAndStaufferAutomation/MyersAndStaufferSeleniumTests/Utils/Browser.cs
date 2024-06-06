
using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;

namespace MyersAndStaufferSeleniumTests.Utils
{
    public enum BrowserDriver
    {
        Chrome,
        Firefox,
        Edge,
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
            String driverpath = TestExecutor.Driverpath;
            switch (driver)
            {
                case BrowserDriver.Chrome:
                    ChromeOptions chromeOptions = new ChromeOptions();
                    chromeOptions.AddArgument("--incognito");
                    chromeOptions.AddArgument("test-type");
                    chromeOptions.AddArgument("--ignore-certificate-errors");
                    chromeOptions.AddArgument("--disable-dev-shm-usage"); // overcome limited resource problems
                    chromeOptions.AddArgument("--no-sandbox"); // Bypass OS security model
                    var timestamp = DateTime.Now.ToFileTime();
                    downloadDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "SeleniumDownload", timestamp.ToString());
                    Directory.CreateDirectory(downloadDirectory);

                    chromeOptions.AddUserProfilePreference("download.default_directory", downloadDirectory);
                    chromeOptions.AddUserProfilePreference("download.prompt_for_download", false);
                    chromeOptions.AddUserProfilePreference("disable-popup-blocking", "true");

                    if (true)
                        chromeOptions.AddArguments("--headless");

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

                case BrowserDriver.Edge:

                    EdgeOptions edgeOptions = new EdgeOptions();
                    edgeOptions.AddArgument("--allow-incognito");
                    edgeOptions.AddArgument("test-type");

                    var timestamp1 = DateTime.Now.ToFileTime();
                    downloadDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "SeleniumDownload", timestamp1.ToString());
                    Directory.CreateDirectory(downloadDirectory);

                    edgeOptions.AddUserProfilePreference("download.default_directory", downloadDirectory);
                    edgeOptions.AddUserProfilePreference("download.prompt_for_download", false);
                    edgeOptions.AddUserProfilePreference("disable-popup-blocking", "true");

                    _driver = new EdgeDriver(edgeOptions);

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

                case BrowserDriver.Safari:
                    throw new NotImplementedException();
            }
        }
    }
}