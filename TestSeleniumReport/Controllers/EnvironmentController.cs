using GitHub;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using SeleniumTestReport.Helper;
using TestSeleniumReport.DTO_s;

namespace TestSeleniumReport.Controllers
{
    public class EnvironmentController : Controller
    {
        private readonly DBHelper _helper;
        public EnvironmentController(DBHelper helper)
        {
            _helper = helper;
        }
        public IActionResult Index()
        {
            try
            {
                var EnvironmentListJson = _helper.GetEnvironments();
                List<Models.Environments> _environmentList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Environments>>(EnvironmentListJson);
                return View(_environmentList);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ActionResult Add()
        {
            var ApplicationListJson = _helper.GetApplications();
            List<Models.Applications> _applicationList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Applications>>(ApplicationListJson);
            var BrowserListJson = _helper.GetBrowsers();
            List<Models.Browsers> _BrowsersList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Browsers>>(BrowserListJson);
            ViewBag.Applications = new SelectList(_applicationList, "ApplicationId", "ApplicationName");
            ViewBag.Browsers = new SelectList(_BrowsersList, "BrowserId", "BrowserName");
            ViewBag.AddOrEditPage = "Add";
            Models.Environments environments = new Models.Environments();
            return View("AddEditEnvironment", environments);
        }

        [HttpPost]
        public IActionResult Add(Models.Environments model, string action)
        {
            Dto_Response _response = new Dto_Response();
            if (model != null )
            {
                string result = _helper.AddUpdateEnvironmentJson(model);
                _response = Newtonsoft.Json.JsonConvert.DeserializeObject<Dto_Response>(result);
            }
            return RedirectToAction("Index");
        }

        public ActionResult Edit(int id)
        {
            Models.Environments environments = _helper.GetEnvironmentById(id);
            var ApplicationListJson = _helper.GetApplications();
            List<Models.Applications> _applicationList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Applications>>(ApplicationListJson);
            var Browserss = _helper.GetBrowsers();
            List<Models.Browsers> _Browserss = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Browsers>>(Browserss);

            // Prepare data for dropdowns
            ViewBag.Applications = new SelectList(_applicationList, "ApplicationId", "ApplicationName");
            ViewBag.Browsers = new SelectList(_Browserss, "BrowserId", "BrowserName");
            ViewBag.AddOrEditPage = "Add";
            return View("AddEditEnvironment", environments);
        }

       
    }
}
