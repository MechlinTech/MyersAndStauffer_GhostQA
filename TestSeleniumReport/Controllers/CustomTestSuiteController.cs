using GitHub;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework.Internal;
using SeleniumTestReport.Helper;
using TestSeleniumReport.DTO_s;
using TestSeleniumReport.Models;

namespace TestSeleniumReport.Controllers
{
    public class CustomTestSuiteController : Controller
    {
        private readonly DBHelper _helper;
        public CustomTestSuiteController(DBHelper helper)
        {
            _helper = helper;
        }

        public ActionResult Index()
        {
            ModelState.Clear();
            return View();
        }

        [HttpPost]
        public ActionResult AddTestSuites(string TestSuite)
        {
            string result = _helper.AddUpdateTestSuitesJson(TestSuite);
            Dto_Response _Response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
            return RedirectToAction(_Response.message, "Index");
        }

        public ActionResult GetTestSuites()
        {
            string _testSuiteListJson = _helper.GetTestSuitesJson();
            List<TestSuites> TestSuiteList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<TestSuites>>(_testSuiteListJson);
            return PartialView("_TestSuites", TestSuiteList);
        }

        [HttpPost]
        public ActionResult EditTestSuites(string TestSuiteName, int TestSuiteId)
        {
            try
            {
                string result = _helper.AddUpdateTestSuitesJson(TestSuiteName, TestSuiteId);
                Dto_Response _Response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
                return RedirectToAction(_Response.message, "Index");
            }
            catch
            {
                throw;
            }
        }

        public ActionResult DeleteTestSuites(int TestSuiteId)
        {
            try
            {
                string result = _helper.DeleteTestSuites(TestSuiteId);
                Dto_Response _Response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
                return RedirectToAction(_Response.message, "Index");
            }
            catch
            {
                throw;
            }
        }

        public ActionResult GetTestCases()
        {
            try
            {
                string _testCasesListJson = _helper.GetTestCases();
                List<Dto_TestCaseSelection> _TestCaseList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dto_TestCaseSelection>>(_testCasesListJson);
                return PartialView("_TestCasesSelection", _TestCaseList);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
