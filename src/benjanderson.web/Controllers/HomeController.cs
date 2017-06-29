using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

namespace benjanderson.web.Controllers
{
     public class HomeController : Controller
     {
          private IHostingEnvironment hostingEviroment;

          public HomeController(IHostingEnvironment hostingEnvironment)
          {
               this.hostingEviroment = hostingEnvironment;
          }

          [Route("/")]
          public IActionResult Index()
          {
               if (!System.IO.File.Exists(System.IO.Path.Combine(this.hostingEviroment.ContentRootPath, "wwwroot", "index.html")))
               {
                    return this.NotFound("index.html not found");
               }

               return File("~/index.html", "text/html");
          }
     }
}
