using Microsoft.AspNetCore.Mvc;
using SeleniumTestReport.Helper;

namespace TestSeleniumReport.Controllers
{
    public class BrowserController : Controller
    {
        private readonly DBHelper _helper;
        public BrowserController(DBHelper helper)
        {
            _helper = helper;
        }
        public IActionResult Index()
        {
            try
            {
                var BrowserListJson = _helper.GetBrowsers();
                List<Models.Browsers> _BrowsersList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Browsers>>(BrowserListJson);

                return View(_BrowsersList);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public IActionResult AddBrowser(Models.Browsers model)
        {
            if(model != null)
            {
                var result = _helper.AddUpdateBrowserJson(model);
                return Ok(result);
            }

            return RedirectToAction("Index");
        }

    }
}
