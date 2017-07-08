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
          private MongoDBRepository<ColorTestStats> database;

          public ColorTestController(MongoDBRepository<ColorTestStats> database)
          {
               this.database = database;
          }

          [HttpPost]
          [Route("api/colortest")]
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
               
               this.database.Insert(stat);
               var clientStats = this.database.Table
                    .Where(dbStat => dbStat.Age >= 8 && dbStat.Age <= 80 && dbStat.Clicks >= 25 && dbStat.Score <= 100 && dbStat.Score >= 0)
                    .Select(dbStat => new
               {
                    Score = dbStat.Score,
                    Gender = dbStat.Gender,
                    Age = dbStat.Age
               });
               return Ok(clientStats);
          }
    }

     
}
