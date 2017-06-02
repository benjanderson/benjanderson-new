using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benjanderson.web.Controllers
{
    public class BlogController : Controller
    {
          /// <summary>
          /// legacy redirects from old website
          /// </summary>
          /// <param name="id">integer of the primary key of the blog in the db</param>
          /// <param name="title">friendly title to help with SEO</param>
          /// <returns></returns>
          [Route("Blog/{id:int}/{title}")]
          public IActionResult Index(int id, string title)
          {
               switch (id)
               {
                    case 1002:
                         return RedirectPermanent("https://medium.com/@BenJAnderson/debug-windows-service-cf94a7423619");
                    case 2006:
                         return RedirectPermanent("https://medium.com/@BenJAnderson/simple-sql-server-cursor-example-2236e3d157be");
                    case 2007:
                         return RedirectPermanent("https://medium.com/@BenJAnderson/set-focus-to-control-aspnet-using-c-21cf7c6261e7");
                    case 2008:
                         return RedirectPermanent("https://medium.com/@BenJAnderson/android-listview-that-is-filterable-and-indexable-8e1e46cf0f88");
                    case 2009:
                         return RedirectPermanent("https://medium.com/@BenJAnderson/crashing-c-compiler-bed04b85a027")
               }

               switch (title?.ToLower())
               {
                    case "debug-windows-service":
                         return RedirectPermanent("https://medium.com/@BenJAnderson/debug-windows-service-cf94a7423619");
                    case "simple-sql-server-cursor-example":
                         return RedirectPermanent("https://medium.com/@BenJAnderson/simple-sql-server-cursor-example-2236e3d157be");
                    case "set-focus-to-control-aspnet-using-c-sharp":
                         return RedirectPermanent("https://medium.com/@BenJAnderson/set-focus-to-control-aspnet-using-c-21cf7c6261e7");
                    case "android-listview-that-is-filterable-and-indexable":
                         return RedirectPermanent("https://medium.com/@BenJAnderson/android-listview-that-is-filterable-and-indexable-8e1e46cf0f88");
                    case "crashing-c-sharp-compiler":
                         return RedirectPermanent("https://medium.com/@BenJAnderson/crashing-c-compiler-bed04b85a027");
               }

               return Redirect("https://medium.com/@BenJAnderson");
          }
     }
}
