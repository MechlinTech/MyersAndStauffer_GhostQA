using Microsoft.VisualStudio.TestPlatform.ObjectModel;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile.UserModule
{
    public class TestRunnert : BaseTest
    {
        [Test,Order(0), Category("Clock")]
        //[TestCase(null,TestName = "Clock")]
        public void RunLoginTests()
        {
            //string testCaseName = TestContext.CurrentContext.Test.Properties["Category"].ToString();
            // Console.WriteLine($"Test case name:{ testCaseName}");
           // var testContext = TestContext.CurrentContext;

            // Get the categories for the current test
            //var categories = testContext.Test.Properties["Category"];

            // Print the category names
           // foreach (var category in (string[])categories)
            //{
            //    Console.WriteLine("Category: " + category);
            //}
            LoginTest loginTest = new LoginTest();
            loginTest.Verify_User_Is_Able_To_Login();

        }
    }
}
