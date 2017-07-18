using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace benjanderson.web.Services
{
    public class NotFoundMiddleware
    {
          private RequestDelegate next;

          private SpaResponse spaResponse;

          public NotFoundMiddleware(RequestDelegate next, SpaResponse spaResponse)
          {
               this.spaResponse = spaResponse;
               this.next = next;
          }

          public async Task Invoke(HttpContext context)
          {
               await this.next(context);

               if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
               {
                    var html = spaResponse.GetResponse(context.Request, context.Response);
                    context.Response.StatusCode = 200; 
                    await context.Response.WriteAsync(html);
               }
          }
     }
}
