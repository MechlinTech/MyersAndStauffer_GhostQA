using GitHub;
using Microsoft.AspNetCore.Mvc;
using SeleniumTestReport.Helper;

namespace TestSeleniumReport.Controllers
{
    public class ApplicationController : Controller
    {
        private readonly DBHelper _helper;
        public ApplicationController(DBHelper helper)
        {
            _helper = helper;
        }
        public IActionResult Index()
        {
            try
            {
                var ApplicationListJson = _helper.GetApplications();
                List<Models.Applications> _applicationList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Applications>>(ApplicationListJson);

                return View(_applicationList);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public IActionResult AddApplication(Models.Applications model)
        {
            var result = _helper.AddUpdateApplicationJson(model);
            return Ok(result);
        }


    }
}
