using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using benjanderson.web.Services;
using Box.V2.Config;
using Box.V2.JWTAuth;
using Microsoft.AspNetCore.Mvc;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace benjanderson.web.Controllers
{
     using Box.V2;
     using Box.V2.Auth;
     using Microsoft.Extensions.Configuration;

     [Route("birthdaybot")]
     public class BirthdayBotController : Controller
     {
          private readonly BoxConfig boxConfig;

          public BirthdayBotController(BoxConfig boxConfig)
          {
               this.boxConfig = boxConfig;
          }

          [HttpGet]
          public IActionResult Get(string fileId)
          {
               return this.Json(DateTime.Now);
          }

          [HttpPost("{fileId}")]
          public async Task<IActionResult> Post([FromRoute]string fileId)
          {
               if (string.IsNullOrEmpty(fileId))
               {
                    throw new ArgumentException("Invalid or null fileId");
               }

               var boxJwt = new BoxJWTAuth(this.boxConfig);

               var adminToken = boxJwt.AdminToken(); //valid for 60 minutes so should be cached and re-used
               var client = boxJwt.AdminClient(adminToken);

               var birthdays = new List<Birthday>();

               var stream = await client.FilesManager.DownloadStreamAsync(fileId);
               IWorkbook workbook = new XSSFWorkbook(stream);
               var sheet = workbook.GetSheet("Sheet1");
               for (var i = 2; i < sheet.LastRowNum; i++)
               {
                    var row = sheet.GetRow(i);
                    var name = row.GetCell(0).StringCellValue;
                    var dateString = row.GetCell(1).StringCellValue;

                    if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(dateString))
                    {
                         continue;
                    }

                    try
                    {
                         var formattedDateString = $@"{
                                   dateString
                                        .TrimEnd()
                                        .TrimEnd("nd", StringComparison.InvariantCulture)
                                        .Replace("Autust", "August")
                                        .Replace("Spetember", "September")
                                        .TrimEnd("th", StringComparison.InvariantCulture)
                                        .TrimEnd("rd", StringComparison.InvariantCulture)
                                        .TrimEnd("st", StringComparison.InvariantCulture)
                                        .Trim()
                              } 2010".Trim();

                         var date = DateTime.ParseExact(formattedDateString, "MMMM d yyyy",
                              CultureInfo.InvariantCulture);
                         birthdays.Add(new Birthday { Name = name, Date = date });
                    }
                    catch (FormatException)
                    {
                         // TODO: log error when I actually have an error logger
                         // throw new Exception($"{dateString} is not recognized as a valid date", ex);
                    }
               }

               var slackClient =
                    new SlackClient("https://hooks.slack.com/services/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");

               var lastNight = new DateTime(2010, DateTime.Now.Month, DateTime.Now.Day)
                    .Subtract(TimeSpan.FromDays(1).Subtract(TimeSpan.FromSeconds(1)));
               var nextSundayNight = lastNight.AddDays(7);

               var thisWeeksBdays = birthdays.Where(bday => bday.Date > lastNight && bday.Date <= nextSundayNight);

               var messageString =
                    ":tada: :birthday: We wish the following team members a very Happy Birthday :tada: :birthday:" +
                    Environment.NewLine;
               foreach (var personBirthday in thisWeeksBdays)
               {
                    messageString += personBirthday.Name + " - " + personBirthday.Date.ToString("MM/dd") +
                                     Environment.NewLine;
               }

               slackClient.PostMessage(new Payload { Text = messageString });

               return this.Ok(birthdays);
          }
     }

     public class Birthday
     {
          public string Name { get; set; }

          public DateTime Date { get; set; }
     }

     public static class Helpers
     {
          public static string TrimEnd(this string input, string suffixToRemove,
               StringComparison comparisonType)
          {
               if (input != null && suffixToRemove != null
                   && input.EndsWith(suffixToRemove, comparisonType))
                    return input.Substring(0, input.Length - suffixToRemove.Length);
               return input;
          }
     }
}
