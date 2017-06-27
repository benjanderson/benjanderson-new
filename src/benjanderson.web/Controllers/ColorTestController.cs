using benjanderson.web.Models;
using benjanderson.web.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace benjanderson.web.Controllers
{
     public class ColorTestController : Controller
     {
          private MongoDatabase database;

          public ColorTestController(MongoDatabase database)
          {
               this.database = database;
          }

          [HttpPost]
          [Route("api/colortest/score")]
          public IActionResult Score([FromBody] ColorTestRequest colorTestRequest)
          {
               var stat = new ColorTestStats
               {
                    Score = Math.Round((colorTestRequest.Score * 100), 2),
                    Age = colorTestRequest.Age,
                    Date = DateTime.UtcNow,
                    Gender = colorTestRequest.Gender,
                    Clicks = colorTestRequest.Clicks,
                    IpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString()
               };
               
               this.database.GetColorTestStats().Insert(stat);
               return Ok();
          }
    }

     
}
