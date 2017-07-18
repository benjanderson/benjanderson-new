using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using benjanderson.web.Services;

namespace benjanderson.web.Controllers
{
     public class HomeController : Controller
     {
          private IHostingEnvironment hostingEnvironment;

          private SpaResponse spaResponse;

          public HomeController(SpaResponse spaResponse)
          {
               this.spaResponse = spaResponse;
          }

          [Route("/")]
          public IActionResult Index()
          {
               var html = this.spaResponse.GetResponse(this.Request, this.Response);
               
               return Content(html, "text/html");
          }
     }
}
