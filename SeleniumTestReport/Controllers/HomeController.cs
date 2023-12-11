using SeleniumTestReport.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeleniumTestReport.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            DBHelper dbHelper = new DBHelper();
            DataTable TestSuits = dbHelper.GetDataTestSuits();
            return View();
        }
    }
}