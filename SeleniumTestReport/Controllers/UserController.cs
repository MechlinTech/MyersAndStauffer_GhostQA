using System.Web.Mvc;

namespace SeleniumTestReport.Controllers
{
    public class UserController : Controller
    {
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username)
        {
            string password = string.Empty;
            return IsValidUser(username, password) ? RedirectToAction("Index", "Home") : (ActionResult)View();
        }

        private bool IsValidUser(object username, object password)
        {
            return username == "Admin" && password == "admin";
        }
    }
}