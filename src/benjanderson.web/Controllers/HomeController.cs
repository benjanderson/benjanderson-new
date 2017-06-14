using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace benjanderson.web.Controllers
{
<<<<<<< HEAD
     public class HomeController : Controller
     {
          [Route("/")]
          public IActionResult Index()
          {
               return File("~/index.html", "text/html");
          }
     }
=======
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
>>>>>>> 0b84436... remove fluff and get to starting point
}
