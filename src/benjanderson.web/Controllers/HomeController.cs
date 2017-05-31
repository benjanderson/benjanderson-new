using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace benjanderson.web.Controllers
{
     public class HomeController : Controller
     {
          [Route("/")]
          public IActionResult Index()
          {
               return File("~/index.html", "text/html");
          }
     }
}
