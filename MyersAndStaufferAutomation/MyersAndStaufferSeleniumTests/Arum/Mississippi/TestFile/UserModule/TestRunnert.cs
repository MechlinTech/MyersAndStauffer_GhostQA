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
        
        public void RunMissippi()
        {
            LoginTest loginTest = new LoginTest();

            loginTest.VerifyLoginOK();
        }
    }
}
