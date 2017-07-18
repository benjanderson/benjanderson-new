using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace benjanderson.web.Services
{
     public class SpaResponse
     {
          private IHostingEnvironment hostingEnvironment;

          public SpaResponse(IHostingEnvironment hostingEnvironment)
          {
               this.hostingEnvironment = hostingEnvironment;
          }

          internal string GetResponse(HttpRequest request, HttpResponse response)
          {
               var index = System.IO.Path.Combine(this.hostingEnvironment.ContentRootPath, "wwwroot", "index.html");
               if (!System.IO.File.Exists(index))
               {
                    response.StatusCode = 404;
                    return "index.html not found";
               }

               var metaTags = new Dictionary<string, string>
               {
                    { "og:title", string.Empty },
                    { "og:description", string.Empty },
                    { "description", string.Empty },
                    { "og:image", string.Empty },
                    { "thumbnail", string.Empty },
                    { "twitter:card", string.Empty },// summary = text only, summary_large_image = image
                    { "twitter:image:alt", string.Empty },

                    { "og:site_name", "Benjamin J Anderson - Personal Website" },
                    { "fb:app_id", "196272287163075" },
                    { "twitter:site", "@BenJAnderson1" },
                    { "twitter:creator", "@BenJAnderson1" },
                    { "article:author", "https://www.facebook.com/benjanderson" }
               };

               string title = "Benjamin J Anderson", image = null, description = null;
               switch (request.Path)
               {
                    case "/":
                         title = "Home Page | Benjamin J Anderson";
                         description = "Personal website of mine, used to publish information about myself but mainly to test and show off some demos of things I am learning.";
                         image = "http://files.benjaminjanderson.com/benjaminjandersonblob/ben-mug.jpg";
                         break;
                    case "/about-me":
                         title = "About Me | Benjamin J Anderson";
                         description = "Contact Info, Work History, Resume, Personal Info";
                         image = "http://files.benjaminjanderson.com/benjaminjandersonblob/ben-mug.jpg";
                         break;
                    case "/color-test":
                         title = "Color IQ Test | Benjamin J Anderson";
                         description = "Find out if you are among the 1 in 255 women and 1 in 12 men who have some form of color vision deficiency";
                         image = "http://files.benjaminjanderson.com/benjaminjandersonblob/color-blind-thumb.jpg";
                         break;
               }

               metaTags["og:title"] = title;
               metaTags["twitter:image:alt"] = metaTags["og:image"] = metaTags["thumbnail"] = image;
               metaTags["og:description"] = metaTags["description"] = description;
               metaTags["twitter:card"] = string.IsNullOrWhiteSpace(image) ? "summary" : "summary_large_image";

               var tagText = metaTags
                    .Where(tag => !string.IsNullOrWhiteSpace(tag.Value))
                    .Select(tag => $"<meta name=\"{tag.Key}\" content=\"{tag.Value}\">");

               var absoluteUri = string.Concat(
                        request.Scheme,
                        "://",
                        request.Host.ToUriComponent(),
                        request.PathBase.ToUriComponent());

               var html = System.IO.File.ReadAllText(index);
               html = Regex.Replace(html, @"<title>.*</title>", $"<title>{title}</title>", RegexOptions.Singleline);
               html = html.Replace(
                    @"<base href=""/"">",
                    $"<base href=\"{absoluteUri}\">" +
                    Environment.NewLine +
                    string.Join(Environment.NewLine, tagText));

               return html;
          }
     }
}
